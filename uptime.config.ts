// This is a simplified example config file for quickstart
// Some not frequently used features are omitted/commented out here
// For a full-featured example, please refer to `uptime.config.full.ts`

// Don't edit this line
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  // Title for your status page
  title: "ryopc's Status Page",
  // Links shown at the header of your status page, could set `highlight` to `true`
  links: [
    { link: 'https://github.com/ryopc', label: 'GitHub' },
    { link: 'https://ryopc.f5.si/', label: 'site' },
    { link: 'mailto:ceo@ryopc.f5.si', label: 'Email Me', highlight: true },
  ],
}

const workerConfig: WorkerConfig = {
  // Define all your monitors here
   monitors: [
    {
      id: 'ryopc_main',
      name: 'ryopc.f5.si',
      method: 'GET',
      target: 'https://ryopc.f5.si',
    },
    {
      id: 'ryopc_auth',
      name: 'auth.ryopc.f5.si',
      method: 'GET',
      target: 'https://auth.ryopc.f5.si',
      expectedStatusCodes: [404],
    },
    {
      id: 'ryopc_dsns',
      name: 'd-sns.ryopc.f5.si',
      method: 'GET',
      target: 'https://d-sns.ryopc.f5.si',
    },
  ],


      // [OPTIONAL] body to be sent (require POST/PUT/PATCH method)
      // body: 'Hello, world!',
      // [OPTIONAL] if specified, the response must contains the keyword to be considered as operational.
      // responseKeyword: 'success',
      // [OPTIONAL] if specified, the response must NOT contains the keyword to be considered as operational.
      // responseForbiddenKeyword: 'bad gateway',
      // [OPTIONAL] if specified, will call the check proxy to check the monitor, mainly for geo-specific checks
      // refer to docs https://github.com/lyc8503/UptimeFlare/wiki/Check-proxy-setup before setting this value
      // currently supports `worker://`, `globalping://` and `http(s)://` proxies
      // checkProxy: 'worker://weur',
      // [OPTIONAL] if true, the check will fallback to local if the specified proxy is down
      // checkProxyFallback: true,
    

   // [Optional] Notification settings
  notification: {
    webhook: {
      // 自分の「ユーザー名」と「リポジトリ名」に書き換えてください
      url: 'https://github.com/ryopc/ryopc-Status/dispatches',
      method: 'POST',
      headers: {
        // ステップ1で取得したトークンを、ghp_...のままここに貼り付けます
Authorization: `token ${typeof process !== 'undefined' ? process.env.GH_NOTIFY_TOKEN : ''}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'UptimeFlare-Monitor',
      },
      payloadType: 'json',
      payload: {
        event_type: 'trigger_issue',
        client_payload: {
          text: '$MSG', // ここに障害メッセージが入ります
        },
      },
      timeout: 10000,
    },
    timeZone: 'Asia/Tokyo',
    gracePeriod: 0, // 落ちたらすぐにIssueを作りたいので0にします
  },
}
const maintenances = [
  {
    id: 'dummy-maintenance',
    title: 'Scheduled Maintenance',
    start: 0,
    end: 0,
    body: 'This is a placeholder',
    monitors: [] as string[]
  }
]




// You can define multiple maintenances here
// During maintenance, an alert will be shown at status page
// Also, related downtime notifications will be skipped (if any)
// Of course, you can leave it empty if you don't need this feature



// Don't edit this line
export { maintenances, pageConfig, workerConfig }
