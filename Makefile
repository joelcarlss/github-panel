phony:
	echo "Hej"

deployhosting:
	yarn run build
	firebase deploy --only hosting

deploy:
	firebase deploy

i:
	npm install

.PHONY: phony $(MAKECMDGOALS)