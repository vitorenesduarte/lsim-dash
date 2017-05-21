lint:
	for f in $$(ls -d Dockerfiles/*); do dockerlint $$f; done
