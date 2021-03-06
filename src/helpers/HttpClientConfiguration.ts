/*
	Copyright 2018 Telenor Digital AS

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

import { autoinject } from "aurelia-framework";

import { ResponseHandler } from "Helpers/ResponseHandler";

import { LogBuilder } from "Helpers/LogBuilder";
const Log = LogBuilder.create("Http client config");

@autoinject
export class HttpClientConfiguration {
  constructor(private responseHandler: ResponseHandler) {}

  apiEndpointConfiguration() {
    return (client) => {
      client.withBaseUrl(HORDE_ENDPOINT);
      client.withCredentials(true);
      client.withHeader("Cache-Control", "no-store");
      client.withInterceptor({
        responseError: (responseError) => {
          const customError = this.responseHandler.handleResponse(responseError);

          Log.debug("In responseError", responseError, customError);
        },
      });
    };
  }
}
