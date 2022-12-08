# Tests

This folder is not currently being used as part of the GitHub Actions workflow because ~~I don't know how~~ it's not *really* necessary. This is more just convenient, automated testing.

**Requisites**: Python (no shot I'm writing this in javascript)

## Usage
```shell
python -i tests.py
```

This will bring you into an interactive Python terminal where you can call each individual test, or multiple tests (read code to see what's there). Example:

```shell
python -i tests.py

>>> is_allup()
[+] success on http://localhost:3000/
[+] success on http://localhost:3000/home
[+] success on http://localhost:3000/feed
[+] success on http://localhost:3000/login
[+] success on http://localhost:3000/create
[+] success on http://localhost:3000/about
[('[+] success on http://localhost:3000/', <Response [200]>), ('[+] success on http://localhost:3000/home', <Response [200]>), ('[+] success on http://localhost:3000/feed', <Response [200]>), ('[+] success on http://localhost:3000/login', <Response [200]>), ('[+] success on http://localhost:3000/create', <Response [200]>), ('[+] success on http://localhost:3000/about', <Response [200]>)]
```