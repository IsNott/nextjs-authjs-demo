import { FetchGitHubUserInfo } from "../lib/action"

export default async function GitHubUserInfo({code} : {code : string}) {
  await FetchGitHubUserInfo(code)
  return(<>
  </>)
};
