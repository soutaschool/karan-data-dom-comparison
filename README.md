# Deep understand HTML DOM

## How it works

```bash
npm run dev
```

## Add a large amount of DOM

**DocumentFragment** can be used.
This allows elements to be stored once in memory and displayed all at once, improving performance.

```mermaid
flowchart TB
    Start[Start] --> CreateElements[Create Elements]
    CreateElements --> ChooseMethod{Choose Method}
    ChooseMethod -->|Normal| Normal[Normal Operation]
    ChooseMethod -->|Advanced| Advanced[Advanced Operation]
    Normal --> AppendEach[Append Each Element]
    AppendEach --> RepaintN[Frequent Repaint]
    Advanced --> AppendFrag[Append Fragment]
    AppendFrag --> RepaintA[Single Repaint]
    RepaintN --> End[End]
    RepaintA --> End
```

## Delete a large amount of DOM

**ReplaceChildren** can be used.
Properly releases references to old nodes when deleting an existing child node and replacing it with a new child node
In addition, it is possible to delete them all at once.

```mermaid
flowchart TB
    Start[Start] --> Check{Are there elements?}
    Check --> |No| End[End]
    Check --> |Yes| Choose{Choose deletion method}
    Choose --> |Remove Individually| RemoveIndividually["Delete each element individually"]
    Choose --> |innerHTML| ClearInnerHTML["Set innerHTML empty "]
    Choose --> |Loop Remove| RemoveWithLoop["Delete using while loop"]
    Choose --> |replaceChildren| UseReplaceChildren["Use replaceChildren() to delete"]
    RemoveIndividually --> ShowResult[Show Results]
    ClearInnerHTML --> ShowResult
    RemoveWithLoop --> ShowResult
    UseReplaceChildren --> ShowResult
    ShowResult --> End
```
