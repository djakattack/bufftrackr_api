# Issues Encountered While Working on This Project

### gyp error

### homebrew-core/homebrew-cask is a shallow clone

While I was reviewing the MongoDB Atlas set up, per the tutorial I am using for this project, I remembered that upon updating to Mac OS Catalina, I had many issues running MongoDB locally. I am now, however, running MacOS Big Sur, so I began the process of trying to run Mongo locally again using [this resource](https://www.codegrepper.com/code-examples/delphi/mongodb+install+in+mac+big+sur+command).

Very early in this process, I received the following error messages.

```
Error:
  homebrew-core is a shallow clone.
  homebrew-cask is a shallow clone.
To `brew update`, first run:
  git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
  git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask fetch --unshallow
This restriction has been made on GitHub's request because updating shallow
clones is an extremely expensive operation due to the tree layout and traffic of
Homebrew/homebrew-core and Homebrew/homebrew-cask. We don't do this for you
automatically to avoid repeatedly performing an expensive unshallow operation in
CI systems (which should instead be fixed to not use shallow clones). Sorry for
the inconvenience!
```

The process of unshallowing the two clones took a very long time on my machine, but the solve was as simple as following the instructions that printed in the terminal.

TINE SPENT ON RESOLUTION: 2 hours 20 minutes.

### Git commits attributed to the incorrect username.

After the first couple of commits of this project, I noticed that my old username for GitHub was being attributed to my commits. Initially my searches for fixing the issue suggested uninstalling and re-installing Git from my computer, but I also found information suggesting that would be a bad idea. I consulted the official [GitHub Docs article on the issue](https://docs.github.com/en/free-pro-team@latest/github/committing-changes-to-your-project/why-are-my-commits-linked-to-the-wrong-user) (which, admittedly, should have been the first place I looked). The issue had a very simple fix that involved [ensuring that the commit email address was set correctly.](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-user-account/setting-your-commit-email-address#setting-your-commit-email-address-in-git).

TIME SPENT ON RESOLUTION: 5 minutes.
