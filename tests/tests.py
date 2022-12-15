#!/usr/bin/env python3
# author: @An00bRektn
import requests as r
import urllib.parse

# Change URL if you want to test prod environment
URL = "http://localhost:3000"
ROUTES = [
    "/",
    "/home",
    "/feed",
    "/login",
    "/create",
    "/about"
]

# Python decorator to prevent certain tests from being used
def deprecated(function):
    def handler():
        print("[!] Test has temporarily been deprecated until edits have been made to make the test function correctly!")
    return handler

def is_up(route: str = ""):
    if route == "":
        print("[*] Please call is_up() with a route. Ex: is_up('/about')\n  \\\\--> Type `ROUTES` to see a list of routes.")
    req = r.get(f"{URL}{route}")
    if req.status_code == 200:
        return f"[+] success on {URL}{route}", req
    else:
        return f"[!] failed on {URL}{route}", req

def is_allup():
    resps = []
    for route in ROUTES:
        res = is_up(route)
        resps.append(res)
        print(res[0])
    return resps

# TODO: Prompt for user cookie when authentication is fixed
@deprecated
def generate_posts():
    print("[*] Note: This does not mean that the /create route is user friendly.")
    titles = [
        "The only part of your reflection you can lick is your tongue.",
        "My Favorite Things #1337",
        "I ate a tire.",
        "This is an attempt at XSS"
    ]
    posts = [
        "But, like think about it.",
        "<p>Hey all, it's DJ Scratch-n-Sniff back at it again with our 1337th edition of <em><strong>My Favorite Things</strong></em>! I wasn't able to spend <em>too</em> much time this week because I recently got evicted <em>(don't</em> <em>ask)</em>, but here's a list of some cool tracks!</p>\r\n<ul>\r\n<li>Arooj Aftab - Mohabbat (https://www.youtube.com/watch?v=iRZ98HX1MO8)</li>\r\n<li>Louis Cole - Dead Inside Shuffle (https://www.youtube.com/watch?v=RoG-nrvKKZc)</li>\r\n<li>DANGERDOOM - Space Hos (https://www.youtube.com/watch?v=pkigEQEjEnE)</li>\r\n<li>Llusion - Uh Oh Stinky but It's a Soft Lofi Beat (https://www.youtube.com/watch?v=aKgyO8-b56I)</li>\r\n<li>Tunez (https://www.youtube.com/watch?v=VZTnBXAwuUA)</li>\r\n</ul>\r\n<p>What was your favorite track? Let me know in the comments below</p>\r\n<p>when those lazy devs finally get around to implementing comments >:( </p>",
        "I don't feel too good. Please someone bring to the hospital. I <strong>NEED HELP PLEASE OH GOD MY INSIDES</strong>. i was just trying to be shoenice and i learned that there's only one goat",
        'If you see an alert on your screen, that means you could have been hacked. <script>alert(document.domain.concat("\n").concat(window.origin))</script>'
    ]
    
    for t,p in zip(titles, posts):
        req = r.post(f"{URL}/sendBlog", data={"title":t, "body":p})
        if req.status_code >= 400:
            print(f"[!] Bad Response on title:{t}")
        else:
            print(f"[*] Posted Blog: {t}")
    
    print(f"[+] Go check {URL}/feed to see if all of it showed up")
    print("  \\\\--> What, you thought I was going to automate that part? There's only a week left on this project lmao.")

# Keeps track of all of the tests written so far
TESTS = [
    is_up,
    is_allup,
    generate_posts
]
