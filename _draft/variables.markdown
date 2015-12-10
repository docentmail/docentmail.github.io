---
layout: page
title:  "Variables"
date:   2015-12-02 13:24:36 -0800
categories: javascript
---


Question: what does alert (x); show?

{% highlight js %}
var x = 1;
var y = x;
y=101;
alert (x);
{% endhighlight %}

Answer: 1



Question: what does alert (x[1]); show?

{% highlight js %}
var x = [1,2,3];
var y = x;
y[1]=100;
alert (x[1]);
{% endhighlight %}

Answer: 100


