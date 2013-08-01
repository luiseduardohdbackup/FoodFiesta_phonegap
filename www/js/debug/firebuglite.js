/*
 * Copyright 2011 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var app_name = "kitchenSink";

function doButton() {
	debug.log("doButton", "button clicked", debug.info);
}

function doPageLoad() {
	var x, y;

	x = 5;
	y = 10;
	
	debug.log("doPageLoad", app_name, debug.info);
}

window.addEventListener("load", doPageLoad, false);