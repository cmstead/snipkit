# SnipKit #

SnipKit is a tool to for making it easy to create and edit VS Code native snippets.

Code automation through the use of snippets is a fast, easy way to quickly reclaim your time as a developer. VS Code's snippet functionality is quite extensive, but reading the docs and learning the system takes time. The goal of SnipKit is to shorten the learning curve and give you the tools you need to create snippets right now. As you learn more about your code and what you need, SnipKit provides tools to easily edit your snippets as you work.

## What Does It Do? ##

SnipKit provides tools to make it easier to create, and maintain snippets.

[Watch a Video!](https://www.youtube.com/watch?v=SMsNNKkrrdQ)

Easy access to user snippets:

SnipKit adds a context menu item to take you directly to the edit/configure snippets selection list. Rather than needing to remember the palette hotkey, and the correct search term, just click the menu item and type the language you want to work with.

Snippet Creation:

- Make this a snippet
    - Opens snippet file and uses selected text as the body for a new snippet
- Paste snippet from clipboard
    - Pastes a new snippet using the text from your clipboard as the body
- Loads of predefined snippets
    - Allows for quick adding of new snippets as well as introducing snippet elements into existing snippet

Snippet Editing:

- Format text as a snippet body
    - If you already have a snippet and you're just pasting new text, select it and format. No more string editing drudgery!
- Indent/Outdent
    - Snippet body content always needs indentation adjustment. Now you can indent and outdent without navigating through strings.
- Insert SnipKit snippet into a string
    - Snippets deal heavily in strings, and snippets don't work very well inside strings. Insert snippet bypasses all of that mess.
- Change tab stop index
    - Provides a select dropdown (1-9 and 0) to select a new index for a tab stop

## Keybindings (Hotkeys) ##

- Indent
    - Windows: `ctrl+alt+]`
    - Mac: `cmd+alt+]`
- Outdent
    - Windows: `ctrl+alt+[`
    - Mac: `cmd+alt+[`
- Insert SnipKit Snippet
    - Windows: `ctrl+alt+i`
    - Mac: `cmd+alt+i`
- Make This a Snippet
    - Windows: `ctrl+alt+m`
    - Mac: `cmd+alt+m`
- Change tab stop index
    - Windows: `ctrl+alt+n`
    - Mac: `cmd+alt+n`
- Select and Apply SnipKit Action
    - Windows: `ctrl+alt+k`
    - Mac: `cmd+alt+k`
