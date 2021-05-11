# 🪙 coinage

View it at [coinage.vercel.app](https://coinage.vercel.app/)

I decided to use [Next.js](https://nextjs.org/) for a few reasons:
- ✨ Familiarity
- ✨ Leverage some new features
- ✨ Easy deploy and integration with [Now](https://zeit.co/home)

To interact with the API I did something a bit weird I guess, but this was a combination of wanting to work with some next.js features and I guess prematurly optimising a bit. Next.js allows you to integrate and API, I used this to create and endpoint with a serverless function that actually hits the API. This code is here -> `pages/api/latest.js`.

What is the point of that, you ask. Well now in my app I can do this:
```javascript
  const { data, error } = useSWR("/latest")
```

Well it gets a slightly more complex than that, but that it the base of why I chose the use it. Also testing out (swr)[https://swr.now.sh/]. Which is very cool, but I am new to it so I think I am just presenting the tip of the iceberg here. 

For UI I have leveraged the build in css modules and kept it fairly simple. Responsive tables are a bit of a nightmare so my table is not really a table 🤭 But it changes to a nice card layout (I think), see ->  `components/MarketOverview/marketOverview.module.css`

For charts I decided to use [nino](https://nivo.rocks/scatterplot/) - it has a lot of the things I needed built in and is just generally pretty awesome to work with. 

For state management I just used React's built in hooks, I didn't want to prematurely optimise this and it's quite nice and simple for the moment. 
