.PHONY: build test clean reconfigure

index.js: source/Injectable.js
	@ npm install \
	&& npm run build \
# 	&& rm -rf node_modules package-lock.json;

test:
	@ npm install \
	&& npm run build-test \
	&& node test.js; \
# 	rm -rf node_modules test.js package-lock.json;

d-test:
	@ docker run --rm node:12.6.0-alpine \
		-v `pwd`:/app \
		-w="/app" \
			npm install \
			&& npm run build-test \
			&& node test.js;

clean:
	@ rm -rf node_modules *.js package-lock.json configure;
