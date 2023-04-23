import github from "@actions/github";
import core from "@actions/core";

async function run() {
  try {
    const path = core.getInput("path");
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);

    const res = await octokit.rest.repos.compareCommitsWithBasehead({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      basehead: "HEAD~1...HEAD",
    });

    const pathRegex = new RegExp(path);
    const changedFiles = res.data.files ?? [];
    const isChanged = changedFiles
      .some(changedPath=>pathRegex.test(changedPath));

    core.setOutput("changed", isChanged);
  } catch (error) {
    core.setFailed(error.message);
  }
}

await run();
