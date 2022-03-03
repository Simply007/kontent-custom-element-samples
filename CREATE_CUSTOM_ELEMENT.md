# How to create new custom element
Custom elements are small HTML apps that exist in a sandboxed `<iframe>` and interact with Kontent through the [Custom Elements API](https://kontent.ai/learn/reference/custom-elements-js-api/).

In this tutorial, you'll learn how to create your own custom element to implement a Markdown editor. It's based on one of our sample custom elements that uses [SimpleMDE](https://github.com/Kentico/kontent-custom-element-simplemde-markdown-editor) to create a text area where you can edit text in the Markdown syntax and get a visual preview of the result.

## 1. Create a page
The first thing to do is to create a basic HTML page to hold your custom element.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Markdown</title>
    <!-- libs -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
  </head>
  <body>
    <!-- Custom element HTML -->
    <textarea id="editor"></textarea>

    <!-- Custom element code -->
    <script>
        // The place for your code
    </script>
</body>
</html>
```
What you see above is a basic HTML with [jQuery](https://jquery.com/) and [SimpleMDE](https://github.com/Kentico/kontent-custom-element-simplemde-markdown-editor) in the head and a body with places for the editor itself (the text area) and code that will fill in the editor with what you want.

## 2. Include the Custom Elements API
The Custom Elements API is a JavaScript API that enables you to create custom elements for Kontent. Add it to the head of your page.

```
<script src="https://app.kontent.ai/js-api/custom-element/v1/custom-element.min.js"></script>
```

## 3. Add styles
You might want the Markdown editor to look slightly different from the rest of the Kontent UI so your editors see clearly that they're writing differently there. You can use the CSS for SimpleMDE and just a touch of custom styles to make it fit.

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css"/>
<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
```
If you want to make your custom element look consistent with the rest of the Kontent UI, you can use the [prepared styling on GitHub](https://github.com/Kentico/kontent-custom-element-samples/tree/master/shared). There, you'll find `custom-element.css` with styles and `kentico-icons-v3.0.1.woff2` for all the Kontent icons, plus some examples in `examples.html`.

## 4. Initialize your custom element
To get your element started, you need to get information from Kontent about where your element is. This helps you determine things like what size the element should have and whether the current user can edit the item. The latter lets you know whether or not to allow your custom editor to edit the item.

To get this information, use the [`init` method](https://kontent.ai/learn/reference/custom-elements-js-api/#a-init-method) from the API by adding the following code.

```
var editorInstance = null

function initCustomElement() {
  try {
    CustomElement.init((element, _context) => {
      // Setup with initial value and disabled state
      initializeEditor(element.value, element.disabled);
      updateSize();
    });

    // React on disabled changed (e.g. when publishing the item)
    CustomElement.onDisabledChanged(updateDisabled);
  } catch (err) {
    // Initialization with Kentico Custom element API failed (page displayed outside of the Kentico UI)
    console.error(err);
    initializeEditor(err.toString());
  }
}

initCustomElement();
```
Here, you're using a function that sets up your editor using the `init` method. That function's parameters tells your editor whether there's already a value and if the editor should be disabled.

The initialization also includes a call to update the size of the editor to fit the UI. Additionally, it uses the [`onDisabledChanged` method](https://kontent.ai/learn/reference/custom-elements-js-api/#a-ondisabledchanged-method) to detect any changes in the element's state so that if the item is disabled in the UI (for example, if it's published), the element updates its state.

There's also error handling that places an error both in the console and in the editor itself as its initial value in case an exception occurs.

## 5. Initialize the Markdown editor
Now that the element is set up and ready to call the Markdown editor, you need to define the function for the editor.

```
function initializeEditor(initialValue, isDisabled) {
  // Setup SimpleMDE
  editorInstance = new SimpleMDE({
    initialValue: initialValue || "",
    element: document.getElementById("editor"),
    hideIcons: ["fullscreen", "guide", "side-by-side"],
    spellChecker: false,
    status: ["lines", "words"]
  });

  // Update initial disabled state
  updateDisabled(isDisabled);

  // React on window resize to adjust the height
  window.addEventListener("resize", updateSize);
}
```
The function defines the initial state of the editor in the HTML element specified by ID, checks whether it should be disabled, and sets up an event listener for updating the size of the editor on window size change.

## 6. Set the element's value
In order for Kontent to recognize the value of the element and include it in the item, you need to tell Kontent what the value is. Add the following code to the end of your `initializeEditor` function.
```
  // React on window editor value changes to update the value in Kentico.
  editorInstance.codemirror.on("changes", () => {
    setValue(editorInstance.value());
    updateSize();
  });
```
We'll define the `updateSize()` function in the next step. Now, define a function to send the element's value to Kontent.
```
function setValue(value) {
  // Send updated value to Kentico (send null in case of the empty string => element will not meet required condition).
  if (!isDisabled) {
    CustomElement.setValue(value || null);
  }
}
```
Now, any time the value of your editor changes (and the element is not disabled), the editor uses the [`setValue` method](https://kontent.ai/learn/reference/custom-elements-js-api/#a-setvalue-method) to tell Kontent what the value is.

## 7. Set the element's size
It's important to make sure your element fits within the editing space in the Kontent UI. It's also important to do it quickly to avoid screen flickering while scrolling and other related issues. Define a function to set the element width.

```
function updateSize() {
  // Update the custom element height in the Kentico UI.
  const height = Math.ceil($("html").height());
  CustomElement.setHeight(height);
}
```
The function finds how tall the element should be and then sets it with the [`setHeight` method](https://kontent.ai/learn/reference/custom-elements-js-api/#a-setheight-method).

If you want to make your custom element scrollable, consider also adding a border or a shadow to it to distinguish the element from the rest of the UI.

## 8. Ensure the element is disabled correctly
When an item is disabled in the Kontent UI, it's important to disable your custom editor, too. Otherwise, you'd run into issues with updates to published items or users editing items they don't have permissions for. Define a function that sets the state of the editor.
```
var isDisabled = false;

function updateDisabled(disabled) {
  if (editorInstance && editorInstance.codemirror) {
    const $toolbar = $(".editor-toolbar");
    editorInstance.codemirror.options.readOnly = disabled;
    if (disabled) {
      $toolbar.hide();
    } else {
      $toolbar.show();
    }
    updateSize();
  }
  isDisabled = disabled;
}
```
This function uses its single parameter to determine whether to show or hide the editor toolbar and then whether to disable changes to the element's value (by properly setting the `isDisabled` variable). 

We recommend you also gray out your custom element to visually indicate the disabled state.

## Final custom element HTML page
Now that you have all the functions defined, here's how the whole custom element HTML page should look like if you followed the instructions above:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Markdown</title>
    <!-- libs -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
    <script src="https://app.kontent.ai/js-api/custom-element/v1/custom-element.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css"/>
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <!-- Test of manually completing the script from the tutorial -->
    <!-- Custom element HTML -->
    <textarea id="editor"></textarea>

    <!-- Custom element code -->
    <script>
        var editorInstance = null

        function initCustomElement() {
          try {
            CustomElement.init((element, _context) => {
              // Setup with initial value and disabled state
              initializeEditor(element.value, element.disabled);
              updateSize();
            });

            // React on disabled changed (e.g. when publishing the item)
            CustomElement.onDisabledChanged(updateDisabled);
          } catch (err) {
            // Initialization with Kentico Custom element API failed (page displayed outside of the Kentico UI)
            console.error(err);
            initializeEditor(err.toString());
          }
        }

        initCustomElement();

        function initializeEditor(initialValue, isDisabled) {
          // Setup SimpleMDE
          editorInstance = new SimpleMDE({
            initialValue: initialValue || "",
            element: document.getElementById("editor"),
            hideIcons: ["fullscreen", "guide", "side-by-side"],
            spellChecker: false,
            status: ["lines", "words"]
          });

          // Update initial disabled state
          updateDisabled(isDisabled);

          // React on window resize to adjust the height
          window.addEventListener("resize", updateSize);
          // React on window editor value changes to update the value in Kentico.
          editorInstance.codemirror.on("changes", () => {
            setValue(editorInstance.value());
            updateSize();
          });
        }

        function setValue(value) {
          // Send updated value to Kentico (send null in case of the empty string => element will not meet required condition).
          if (!isDisabled) {
            CustomElement.setValue(value || null);
          }
        }

        function updateSize() {
          // Update the custom element height in the Kentico UI.
          const height = Math.ceil($("html").height());
          CustomElement.setHeight(height);
        }

        var isDisabled = false;

        function updateDisabled(disabled) {
          if (editorInstance && editorInstance.codemirror) {
            const $toolbar = $(".editor-toolbar");
            editorInstance.codemirror.options.readOnly = disabled;
            if (disabled) {
              $toolbar.hide();
            } else {
              $toolbar.show();
            }
            updateSize();
          }
          isDisabled = disabled;
        }
    </script>
</body>
</html>
```
If you have something similar to this, you're ready to deploy the element and put it to use.