import wikipedia

womenPage = wikipedia.page("List of female scientists before the 21st century")
women = womenPage.links
for w in women:
  print w.encode('utf8')
