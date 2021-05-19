# nonsense

A typing app which generates nonsense with realistic word frequencies. [Try
it!][]

## A frustration with existing typing apps

Many typing practice apps provide the option to type a random sequence of
words, whereby words are drawn uniformly from some small set. Commonly the most
frequently used 200 words are used. The larger the source set, the harder the
test is, because we're forced to type more obscure and less well practiced
words.

Zipping effortlessly through the most common 200 words is satisfying, but isn't
great practice for typing real text. On the other hand typing tests of this
sort that draw from a large enough set of words **feel wrong**. They become
harder work than typing real text, because seemingly every word is long and
obscure, and the usual rhythm of typing mostly common words punctuated by the
occasional zinger is lost. Real text contains a huge proportion of a small
number of very common words (see [Zipf's law][]).

## A better way

I propose a better solution: generate text with realistic frequencies. If "the"
accounts for 7% of all words in the wild, it should also make up 7% of the
words in your typing test. The results **feel right** and it's also perfect
practice, in so much as how often you practice a word will be exactly
proportional to how often it appears in actual use.

This is technically easy to achieve given a frequency list such as [this one on
Wiktionary][], which lists words from a large corpus along with their frequency
of occurance. Instead of selecting words uniformly at random from the full set,
[take a weighted selection][] using the frequencies as weights. I'm using the
top 10,000, which accounts for 97% of all words.

To get a feel for this, here's a uniform selection from the top 200 words:

```
would be there day yes you're like still what it don't your long do those how
mean like you've let's with day had why isn't well I'd let anything into what
one and these about great him was like them
```

1000 words:

```
face somebody book mouth huh clothes isn't seen alive so Todd eight hey
Christmas present also police self person works hang president kill before
ready clothes hold we she's yeah part lately day big
```

10,000 words:

```
council bubble manticore given invitations recently episodes moms valentine
Maxine anything's leg fears gettin unbelievably lip dancer bigger onion
supposed taking hook invitations Madeline sinking trying
```

and finally a weighted selection from the top 10,000 words:

```
high a you're it the your and the make while me so the can't maybe our because
a he me kill sister with went any has well do know for for mean stand of hooker
a is actually just right used means you of
```

[Try it!]: https://callumoakley.net/nonsense/
[Zipf's law]: https://en.wikipedia.org/wiki/Zipf%27s_law
[this one on Wiktionary]: https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#TV_and_movie_scripts
[take a weighted selection]: /nonsense.js
