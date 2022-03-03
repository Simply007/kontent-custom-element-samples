# Gallery of Custom Element samples for Kontent by Kentico


![Last modified][last-commit]
[![Issues][issues-shield]][issues-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]


[![Stack Overflow][stack-shield]](https://stackoverflow.com/tags/kentico-kontent)
[![GitHub Discussions][discussion-shield]](https://github.com/Kentico/Home/discussions)

<hr />

![CI deployment](https://github.com/Kentico/kontent-custom-element-samples/workflows/CI%20deployment/badge.svg?style=for-the-badge?style=for-the-badge)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a7e07037-df60-476f-81ec-628ab95130bf/deploy-status?style=for-the-badge)](https://app.netlify.com/sites/kontent-custom-element-samples/deploys)

<hr />

<p align="center">
<image src="kk-logo.svg" alt="kontent logo" width="300"/>
</p>

## [Custom elements](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrating-your-own-content-editing-features) help you with extending the functionality of Kontent's UI and thus **improving the content editing experience**.

<p align="center">
  <a href="#introduction">Intro</a> •
  <a href="#⚠-disclaimer">Disclaimer</a> •
  <a href="#how-to-create-your-own-custom-element">Create custom element</a> • 
  <a href="#feedback--contributing">Contributing</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#additional-resources">Resources</a>
</p>




# Introduction
A Custom element is essentially a small HTML application that exists in a sandboxed `<iframe>` and interacts with the [Kontent by Kentico](https://kontent.ai/) app via the [Custom Elements API](https://docs.kontent.ai/reference/custom-elements-js-api).

The **Gallery of Custom Element samples** contains a list of different custom elements that might help you to extend content editing capabilities inside of your Kontent project, or even connect with different 3rd party services (like Digital Asset Management tools, or eCommerce solutions).

The custom elements denoted as **core integration** are focusing on a selected subset of integrated services mentioned on https://kontent.ai/integrations. These integrations will have a richer documentation and their issues will be handled with higher priority. 





# ⚠ Disclaimer

1) **Any URLs provided in the repos are not be used in production.** You should follow the steps provided in the custom element's repository to deploy it yourself for testing, or use in production.

2) If a custom element is **missing deploy instructions**, or you're having trouble with setting it up, please **create an issue** in the custom element's repository.

3) If you wish to **use any premade custom element in a production project**, you should perform a **code review and fork/deploy the source code on your own** as the custom elements are subject to change without any notice. It is also always a good idea to inspect a code you are planning to use seriously, especially if it connects to a 3rd party services, and/or requires some kind of special authorization (api keys, ...). 

4) Some of the custom elements may require further configuration such as custom API keys, or be subject to CORS limitation. In those cases you will need to fork the source repository and adjust the configuration in your copy repository according to instructions in the element's README file.

5) Some of the custom elements may contain a form of a **server/backend part** as well (_using Netlify functions, Azure functions, or Amazon Lambda functions_). In that case, the setup process will require deploying and configuring these services as well for the element to work. This should be always mentioned and described in the repository documentation as well. 





<p align="center">
<a href="https://kentico.github.io/kontent-custom-element-samples/gallery" target="_blank"><image src="https://img.shields.io/static/v1?label=&message=Visit%20gallery&color=db3c00&style=for-the-badge" alt="visit gallery" width="200"/></a>
</p>






# How to create your own custom element

See [our dedicated tutorial](./CREATE_CUSTOM_ELEMENT.md) on how to create a custom element for Kontent.

Also, have a look at the general overview of [deploying custom elements to Kontent](https://kontent.ai/learn/tutorials/develop-apps/integrate/content-editing-extensions).

### Styling your custom elements

By including default styles from Kontent, you can make your Custom element look consistent with the rest of the UI.

The [/shared](https://github.com/Kentico/kontent-custom-element-samples/tree/master/shared) folder in this GitHub repository contains:

* [custom-element-v2.css](https://github.com/Kentico/kontent-custom-element-samples/blob/master/shared/custom-element-v2.css) – a CSS stylesheet
* [kentico-icons-v3.0.1.woff2](https://github.com/Kentico/kontent-custom-element-samples/blob/master/shared/kentico-icons-v3.0.1.woff2) – a font file
* [examples.html](https://github.com/Kentico/kontent-custom-element-samples/blob/master/shared/examples.html) – An HTML page containing the implementation details and an HTML markup of some of the basic elements. See also the link in Demo section.

<br />
<p align="center">
<a href="https://kentico.github.io/kontent-custom-element-samples/shared/examples.html" target="_blank"><image src="https://img.shields.io/static/v1?label=&message=show%20markdown%20examples&color=blue&style=for-the-badge" alt="visit gallery" width="250"/></a>
</p>





We recommend you clone the files and host them locally yourself. The `kentico-icons-v3.0.0.woff2` file needs to be hosted in the same directory as the CSS stylesheet to be properly linked.






# Feedback & Contributing

You can contribute by implementing a Custom Element Extension of your choice or pick one from the [ideas](https://github.com/Kentico/kontent-custom-element-samples/issues). Create an HTML web page, include the Custom Elements API in the code, describe what your element does in the Readme file, and send us a pull request.

## Pull request

The pull request should include:

* A screenshot file (animated or static)
  * Must be named using PascalCase (e.g. `YourComponentName.gif`)
  * Must be added to the [`src/data/assets` folder](src/data/assets)
* An element information json file
  * Must be named using PascalCase (e.g. `YourComponentName.json`)
  * Must be added to the [`src/data/elements` folder](src/data/elements)
  * Includes a brief description of the custom element functionality
  * Links to your repository
  * Use existing categories if possible
* Your repository should include a `README.md` file containing
  * A description of the custom element functionality
  * A screenshot/gif showcasing the custom element
  * Step by step instructions how to add custom element to the Kontent application
  * Configuration description example
  * Example of the output in the Delivery Response
  * If possible, a "Deploy to Netlify" button to make it easy to get started ([e.g. Deploying section of SimpleMDE Markdown Editor](https://github.com/Kentico/kontent-custom-element-simplemde-markdown-editor#deploying))


### Sample element JSON

The element information JSON file named after your element's name in PascalCase (e.g. `YourComonentName.json`) must be placed in the [`/src/data/elements` folder](/src/data/elements) with the following format:

```json
{
  "title": "Your Component Name",
  "description": "Short description of your element's purpose and functionality.",
  "thumbnailUrl": "../assets/YourComponentName.(gif|png|jpg)",
  "readmeUrl": "https://github.com/<YourGitHub>/<YourCustomElementRepoName>",
  "categories": [
    "Other"
  ]
}
```

## Release

Release is automatically performed once the commit is done to `master` branch via [GitHub action](https://github.com/Kentico/kontent-custom-element-samples/actions/workflows/deploy.yml).


## Ideas

We'd also appreciate if you [submit your ideas](https://github.com/Kentico/kontent-custom-element-samples/issues) for custom elements or vote for [the existing ones](https://github.com/Kentico/kontent-custom-element-samples/issues).

Check out the [Contributing](https://github.com/Kentico/kontent-custom-element-samples/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions, and begin contributing.





# Contributors
<a href="https://github.com/Kentico/kontent-custom-element-samples/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kentico/kontent-custom-element-magento" />
</a>

We have collected notes on how to c
ontribute to this project in [CONTRIBUTING.md](CONTRIBUTING.md).

# Additional Resources
- [List of core integrations & technology partners](https://kontent.ai/integrations)
- [Kontent's Integration documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/integrations-overview)
- [Custom Element documentation](https://docs.kontent.ai/tutorials/develop-apps/integrate/content-editing-extensions)
- [Custom Element API reference](https://docs.kontent.ai/reference/custom-elements-js-api)


[last-commit]: https://img.shields.io/github/last-commit/Kentico/kontent-custom-element-samples?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/Kentico/kontent-custom-element-samples.svg?style=for-the-badge
[contributors-url]: https://github.com/Kentico/kontent-custom-element-samples/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Kentico/kontent-custom-element-samples.svg?style=for-the-badge
[forks-url]: https://github.com/Kentico/kontent-custom-element-samples/network/members
[stars-shield]: https://img.shields.io/github/stars/Kentico/kontent-custom-element-samples.svg?style=for-the-badge
[stars-url]: https://github.com/Kentico/kontent-custom-element-samples/stargazers
[issues-shield]: https://img.shields.io/github/issues/Kentico/kontent-custom-element-samples.svg?style=for-the-badge
[issues-url]: https://github.com/Kentico/kontent-custom-element-samples/issues
[license-shield]: https://img.shields.io/github/license/Kentico/kontent-custom-element-samples.svg?style=for-the-badge
[license-url]: https://github.com/Kentico/kontent-custom-element-samples/blob/master/LICENSE
[core-shield]: https://img.shields.io/static/v1?label=&message=core%20integration&color=FF5733&style=for-the-badge
[stack-shield]: https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white&style=for-the-badge
[discussion-shield]: https://img.shields.io/badge/GitHub-Discussions-FE7A16.svg?logo=github&style=for-the-badge
[product-demo]: docs/demo.gif?raw=true
