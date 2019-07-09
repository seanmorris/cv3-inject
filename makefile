.PHONY: build test clean reconfigure

index.js: source/Inject.js
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm install \
		&& npx babel source --out-dir ./

test:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm install \
		&& npx babel source test --out-dir ./ \
		&& node test.js

reconfigure:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		npm update

clean:
	@ docker run --rm \
	-v `pwd`:/app \
	-w="/app" \
	node:12.6.0-alpine \
		rm -rf node_modules *.js configure;
