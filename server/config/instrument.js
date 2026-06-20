// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://025da2c0449735d5849c2ad562824773@o4511584900481024.ingest.us.sentry.io/4511595987533824",

  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration
  ],

  // Tracing
  //tracesSampleRate: 1.0,
});

// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();

// Your code here

Sentry.profiler.stopProfiler();