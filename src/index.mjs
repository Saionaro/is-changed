import core from "@actions/core";
import github from "@actions/github";
import { minimatch } from "minimatch";

async function run() {
  try {
    const glob = core.getInput("glob");
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const res = await octokit.rest.repos.compareCommitsWithBasehead({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      basehead: "HEAD~1...HEAD",
    });
    const changedFiles = res.data.files ?? [];
    const isChanged = changedFiles
      .some(changedFile=>minimatch(changedFile.filename, glob))
    core.setOutput("changed", String(isChanged));
  } catch (error) {
    core.setFailed(error.message);
  }
}

await run();
