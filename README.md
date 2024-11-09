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

## Read a large amount content text of DOM

**Map Reduce from JS API** can be used.
Map to get only TextContent of all elements and reduce to sum strings
This can be achieved by a combination of JS functions

```mermaid
flowchart TB
    Start[Start] --> Populate[Generate Elements]
    Populate --> ChooseMethod{Choose Read Method}
    ChooseMethod -->|Normal Read| NormalRead[Execute Normal Read]
    ChooseMethod -->|Advanced Read| AdvancedRead[Execute Advanced Read]

    NormalRead --> SelectElementsNormal[Select All Div elements]
    SelectElementsNormal --> LoopNormal[Loop Through Each Element]
    LoopNormal --> ReadTextNormal[Read textContent of <div> Div each Element]
    ReadTextNormal --> SumNormal[Calculate Total text Count]
    SumNormal --> DisplayNormal[Display Results]

    AdvancedRead --> SelectElementsAdvanced[Convert All <div> Div elements to Static Array]
    SelectElementsAdvanced --> MapAdvanced[Batch Map All textContent]
    MapAdvanced --> SumAdvanced[Calculate Total text Count]
    SumAdvanced --> DisplayAdvanced[Display Results]

    DisplayNormal --> End[End]
    DisplayAdvanced --> End
```

## Update a large amount content text of DOM

Update operation requires changing the properties of each element.
Therefore, **normal functions** lead to better performance than DocumentFragment

```mermaid
flowchart TB
    Start[Start] --> Populate[Generate Elements]
    Populate --> ChooseMethod{Choose Update Method}
    ChooseMethod -->|Normal Update| NormalUpdate[Execute Normal Update]
    ChooseMethod -->|Advanced Update| AdvancedUpdate[Execute Advanced Update]

    NormalUpdate --> LoopNormal[Loop Through Each Element]
    LoopNormal --> UpdateNormal[Update Each Property]
    UpdateNormal --> RenderNormal[Re-render]
    RenderNormal --> End[End]

    AdvancedUpdate --> CreateFragment[Create DocumentFragment]
    CreateFragment --> LoopAdvanced[Loop Through Each Element]
    LoopAdvanced --> MoveToFragment[Move Element to Fragment]
    MoveToFragment --> UpdateAdvanced[Update Each Property]
    UpdateAdvanced --> ReplaceDOM[Replace DOM Fragment]
    ReplaceDOM --> RenderAdvanced[Re-render]
    RenderAdvanced --> End
```
