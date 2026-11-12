from compare import tokenize, compare_texts

print(tokenize("Hey hey\nhello", ignore_extra_spaces=False))
print(tokenize("Hey hey\nhello"))

print(tokenize("Hey         hey hello", ignore_extra_spaces=False))
print(tokenize("Hey         hey hello"))
print("------------------------------------------------------------")
print(compare_texts("Hey hey\nhello", "Hey         hey hello", True)["changes"])
print(compare_texts("Hey hey\nhello", "Hey         hey hello", False)["changes"])
