IMS Global caliper-contexts
================

caliper-contexts provides a JSON-LD remote context that provides a dereferenceable mapping of Caliper terms to IRIs.  The Caliper Context document also links object properties to concepts derived from well-known ontologies such as FOAF, W3C Open Annotation, W3C Organization and schema.org.

## Documentation

See the JSON-LD specification for more information on the JSON-LD concept of the Context: http://www.w3.org/TR/json-ld/#dfn-context

©2015 IMS Global Learning Consortium, Inc. All Rights Reserved.
Trademark Information- http://www.imsglobal.org/copyright.html

For license information contact, info@imsglobal.org and read the license file contained in the repository.

## Validation

Validation of Caliper EventStore payloads is provided using the Caliper [JSON Schema](http://json-schema.org/) document.

### Tests

Unit tests for the Caliper JSON Schema are located in the `test` folder. The tests depend on the [caliper-common-fixtures-public](https://github.com/IMSGlobal/caliper-common-fixtures-public) project, which contains reference Caliper JSON documents. To run the tests follow these steps.

Restore the [caliper-common-fixtures-public](https://github.com/IMSGlobal/caliper-common-fixtures-public) submodule
```
git submodule update --init
```

Install dependencies using npm
```
npm install
```
Or using [yarn](https://github.com/yarnpkg/yarn)
```
npm install -g yarn
yarn
```
And run the tests
```
npm test
```
