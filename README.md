This website is a coding test created for the purpose of a job application with Qantas Group. It is not an official website and is not associated with, endorsed by, or affiliated with Qantas Group. All branding and content is used solely for demonstration purposes.

Live version: https://code-test-gray-psi.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the page.

## Testing

To run eslint:

```bash
npm run lint
```

To perform Jest tests:

```bash
npm run test
```

## Dependencies

For this project I have utilised Next.js with App Router, React and TypeScript. Styles have been applied using the CSS preprocessor SCSS, and svgr is imported as an SVG loader. I have added localisation using next-intl and have written some basic sample tests using Jest. Finally I have enhanced the loading message with WebGL/three.js, using a plane model I created in Blender (loosely based on a 787).

## Design Analysis

After examining the mock design, I believe Helvetica or Helvetica Neue is the primary font used. Since I do not have a web licence for Helvetica, I have selected the Google font Inter as an alternative. I did consider providing a font stack including Helvetica when it was available, but I have instead prioritised a consistent visual experience.

No mobile or tablet layouts were provided, so I have created my own based on common design patterns. If the viewport is thin enough, the content within each hotel item will stack and appear as a card.

The images in the design display at 150px by 125px. However, the mock JSON endpoint selects images from unsplash at a size of 145px by 125px. To account for this, object-fit: cover has been applied so the image does not become distorted. Since the JSON was provided as part of the test materials I have not modified it, but under normal circumstances I would suggest requesting a larger image size to account for devices with higher DPIs.

Finally, I have examined the arrangement of the result items carefully in order to understand the intent of the design. This helped me make decisions on how to structure the HTML and CSS.

- None of the text wraps.
- Each result item is always the same height.
- Each piece of information within result items is always in the same position if present.

From the above points it is clear that the designer values vertical rhythm and a consistent user experience. I have retained these principals in the implementation, including text-overflow: ellipsis and maintaining negative space when some elements are missing. There are some accessibility trade-offs with this approach that will be discussed in its own section.

## Architecture

I have created a mock endpoint using NextResponse, which reads the JSON file from the system. The results are sorted based on a provided query param, then displayed by a client component. I have created a generic component Result List which handles retrieving the response and passes it to it's children. I also wrote a custom hook which abstracts the fetch call, and provides the response data and a status flag.

The loading animation was created using three.js, the canvas itself is in React, but is memoized to prevent it from being re-rendered. It's not ideal to load such a large model in order to display a loading icon, but since this is just a demo project I decided to adhere to the Rule of Cool. The load time is artificially inflated server side with a setTimeout in order to show the loading animation.

The ratings component has been accomplished using an SVG with a mask embedded in the file. There is a rectangle underneath affected by the mask which has its length updated based on the rating using TypeScript. Potentially the colours could also be changed using stylesheets since the SVG's markup is loaded onto the page, not into an image component. One drawback here is that the mask circles/stars have gaps between them, so setting the fill length to the rating as a percentage of the total width may not align with the stars exactly.

## Accessibility

The results component has several accessibility features built into it. These include but aren't limited to:

- High colour contrast: I have slightly darkened some of the copy compared to the design to create a colour contrast greater than 4.5:1.
- Visible focus outline: Using the focus-visible pseudo selector, a dark outline has been added to elements that may be interacted wtih.
- Accessible anchor content: In most cases, the desired behaviour of result items is for the entire element to be clickable. However, wrapping the entire element in an anchor can provide difficulties for users of screen readers since it is too much content for a single anchor. To resolve this, only the heading is inside an anchor, and a simulated click event has been applied to the rest of the card.
- Semantic HTML and ARIA attributes: Where possible, relavent HTML tags and ARIA attributes have been used to aid users with accessibility peripherals. These include role='region', aria-live='polite', aria-labelledby, aria-controls, alt tags and others.

Additionally, thought has been given to the scalibility of the design. There are three main ways a user can zoom on a webpage.

- Pinch to zoom: Common on touch devices. Not ideal as the user may need to scroll horizontally to read the entire line length.
- Setting browser zoom: Up-scales the entire webpage. This is most common on desktop browsers. Zooming too far can activate smaller breakpoints, further obscuring content.
- Text-only scaling: Rather than scaling the entire document uniformly, only CSS metrics using font units will scale. This is commonly used on mobile devices, where the layout does not allow for uniform up-scaling.

In this project, consideration has been given as to where to use scalable units such as rem vs fixed units like px. In the above design, text-overflow is used to prevent text from wrapping. However, this has the drawback of reducing the amount of copy visible to users who are using the text-only scaling. To account for this, I have specified the container's width using rem instead of px. Therefore when the user increases the text size, the container should also grow, giving more room for the text to fit.