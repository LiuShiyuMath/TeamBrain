import {
  init_esm_shims
} from "./chunk-ZWU7KJPP.js";

// ../cli/src/github-api.ts
init_esm_shims();
import https from "https";
async function fetchRemoteSha(input) {
  const { owner, repo, branch } = input;
  const get = input.httpsGet ?? defaultHttpsGet;
  const url = `https://api.github.com/repos/${owner}/${repo}/branches/${branch}`;
  const reqHeaders = {
    "User-Agent": input.userAgent ?? "teamagent-updater",
    "Accept": "application/vnd.github+json"
  };
  if (input.token) {
    reqHeaders["Authorization"] = `Bearer ${input.token}`;
  }
  if (input.ifNoneMatch) {
    reqHeaders["If-None-Match"] = input.ifNoneMatch;
  }
  let res;
  try {
    res = await get(url, reqHeaders);
  } catch (e) {
    return {
      ok: false,
      reason: "network",
      status: 0,
      message: e.message
    };
  }
  const { statusCode, headers } = res;
  if (statusCode === 304) {
    if (!input.ifNoneMatch || !input.cachedSha) {
      return {
        ok: false,
        reason: "parse",
        status: 304,
        message: "304 received but ifNoneMatch + cachedSha not both provided"
      };
    }
    return {
      ok: true,
      sha: input.cachedSha,
      etag: input.ifNoneMatch,
      source: "304"
    };
  }
  if (statusCode === 401) {
    return {
      ok: false,
      reason: "auth",
      status: 401,
      message: "GitHub auth rejected (token invalid or expired)"
    };
  }
  if (statusCode === 403) {
    const remaining = String(headers?.["x-ratelimit-remaining"] ?? "").trim();
    if (remaining === "0") {
      if (input.token) {
        return {
          ok: false,
          reason: "rate_limit_authed",
          status: 403,
          message: "GitHub authenticated rate limit exhausted; retry later"
        };
      } else {
        return {
          ok: false,
          reason: "rate_limit_anonymous",
          status: 403,
          message: "GitHub anonymous rate limit exhausted; set TEAMAGENT_GITHUB_TOKEN to authenticate (5000 req/h)"
        };
      }
    }
    return {
      ok: false,
      reason: "auth",
      status: 403,
      message: "GitHub request forbidden (check token permissions or SSO)"
    };
  }
  if (statusCode === 404) {
    return {
      ok: false,
      reason: "not_found",
      status: 404,
      message: `branch not found: ${owner}/${repo}@${branch}`
    };
  }
  if (statusCode >= 500 && statusCode <= 599) {
    return {
      ok: false,
      reason: "server",
      status: statusCode,
      message: `GitHub server error ${statusCode}`
    };
  }
  if (statusCode === 200) {
    let sha;
    try {
      const obj = JSON.parse(res.body);
      sha = obj.commit?.sha;
    } catch {
      return {
        ok: false,
        reason: "parse",
        status: 200,
        message: "malformed response body"
      };
    }
    if (!sha) {
      return {
        ok: false,
        reason: "parse",
        status: 200,
        message: "malformed response body"
      };
    }
    return {
      ok: true,
      sha,
      etag: headers?.["etag"] ?? null,
      source: "200"
    };
  }
  return {
    ok: false,
    reason: "server",
    status: statusCode,
    message: `GitHub server error ${statusCode}`
  };
}
var defaultHttpsGet = (url, headers) => new Promise((resolve, reject) => {
  let settled = false;
  const safeResolve = (v) => {
    if (!settled) {
      settled = true;
      resolve(v);
    }
  };
  const safeReject = (e) => {
    if (!settled) {
      settled = true;
      reject(e);
    }
  };
  const req = https.get(url, { headers, timeout: 1e4 }, (res) => {
    const chunks = [];
    res.on("data", (c) => chunks.push(c));
    res.on("end", () => safeResolve({
      statusCode: res.statusCode ?? 0,
      body: Buffer.concat(chunks).toString("utf-8"),
      // IncomingHttpHeaders values may be string | string[] | undefined;
      // cast to our declared type — the headers we inspect are always single strings.
      headers: res.headers
    }));
    res.on("error", safeReject);
  });
  req.on("timeout", () => {
    safeReject(new Error("timeout"));
    req.destroy();
  });
  req.on("error", safeReject);
});
export {
  fetchRemoteSha
};
