# twitch-binary-poll

A simple overlay application for displaying simple voting results as an overlay in streams.

## How to use

Simply use the url as a browser source in your favorite live stream app (e.g. OBS) in the format:

```
https://app-url.com/<channel-name>
```

## How it works

The app connects to your twitch chat and constantly scans all incomming messages for known keywords and displays a bar chart for the number of 'votes'.

| Value  | Keywords             |
| ------ | -------------------- |
| Truthy | `y`, `yes`, `1`, `+` |
| Falsy  | `n`, `no`, `0`, `-`  |

It the results get visible after a few keywords got posted in the chat to prevent unwanted occurences when only a single user entered a keyword and automatically hides again after a timeout after no keyword was posted.
