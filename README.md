# SnipKit #

SnipKit is a tool to for making it easy to create and edit VS Code native snippets.

Code automation through the use of snippets is a fast, easy way to quickly reclaim your time as a developer. VS Code's snippet functionality is quite extensive, but reading the docs and learning the system takes time. The goal of SnipKit is to shorten the learning curve and give you the tools you need to create snippets right now. As you learn more about your code and what you need, SnipKit provides tools to easily edit your snippets as you work.

## What Does It Do? ##

SnipKit provides tools to make it easier to create, and maintain snippets.

Easy access to user snippets:

SnipKit adds a context menu item to take you directly to the edit/configure snippets selection list. Rather than needing to remember the palette hotkey, and the correct search term, just click the menu item and type the language you want to work with.

Snippet Creation:

- Loads of predefined snippets
    - Quickly adding things like tab stops and entirely new snippets
- Paste snippet from clipboard
    - From text to snippet:
        1. Highlight and copy text in a file
        2. Open a snippet file (there's a menu option for this)
        3. Select "Paste Snippet" (menu AND keybinding)

Snippet Editing:

- Format text as a snippet body
    - If you already have a snippet and you're just pasting new text, select it and format. No more string editing drudgery!
- Indent/Outdent
    - Snippet body content always needs indentation adjustment. Now you can indent and outdent without navigating through strings.
- Insert SnipKit snippet into a string
    - Snippets deal heavily in strings, and snippets don't work very well inside strings. Insert snippet bypasses all of that mess.

## Keybindings (Hotkeys) ##

- Indent
    - Windows: `ctrl+alt+]`
    - Mac: `cmd+alt+]`
- Outdent
    - Windows: `ctrl+alt+[`
    - Mac: `cmd+alt+[`
- Insert SnipKit Snippet
    - Windows: `ctrl+alt+s, i`
    - Mac: `cmd+alt+s, i`
- Paste Snippet from Clipboard
    - Windows: `ctrl+alt+s, p`
    - Mac: `cmd+alt+s, p`
- Format Text as Snippet Body
    - Windows: `ctrl+alt+s, f`
    - Mac: `cmd+alt+s, f`