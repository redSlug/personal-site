---
title: "Git Playground"
priority: 2
tags:
  ["git", "Python", "bash"]
description: "An exploration of porting sample git hooks from shell to Python.

"
github: "https://github.com/redSlug/git_playground"
---

```python
require_ascii = subprocess.run(
    "git config --type=bool hooks.allownonascii",
    shell=True,
    capture_output=True,
    text=True
).stdout != 'true\n'

if require_ascii:
    file_names_are_ascii = subprocess.run(
        "git diff-index --cached --name-only --diff-filter=A -z " + against,
        shell=True,
        capture_output=True,
        text=True
    ).stdout.isascii()

    if not file_names_are_ascii:
        print(ASCII_ERROR_MESSAGE, file=sys.stderr)
        exit(1)
```

