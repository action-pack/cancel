<h1 align="center">Cancel Workflow<br />
<div align="center">
  
  [![Build](https://github.com/action-pack/cancel/workflows/Build/badge.svg)](https://github.com/action-pack/cancel/)
  [![Version](https://img.shields.io/github/v/tag/action-pack/cancel?label=version&sort=semver&color=066da5)](https://github.com/marketplace/actions/cancel-workflow)
  [![Size](https://img.shields.io/github/languages/code-size/action-pack/cancel?label=size&color=066da5)](https://github.com/action-pack/cancel/)
  
</div></h1>

This action cancels the currently running workflow.

## Usage 🚀

```yaml
permissions:
      actions: write

    steps:
      - name: Cancel workflow
        uses: action-pack/cancel@v1
```

In combination with the ```if``` statement, this allows you to cancel the workflow conditionally:

```yaml
    steps:
      - name: Check condition
        if: env.my_variable == 'true'
        uses: action-pack/cancel@v1
```

## Stars 🌟
[![Stars](https://starchart.cc/action-pack/cancel.svg?variant=adaptive)](https://starchart.cc/action-pack/cancel)
