export const curriculum = [
    // ============================================
    // LEVEL 1: HTML TRACK
    // ============================================
    {
        id: 'html-intro',
        track: 'HTML',
        title: 'HTML Introduction & Editors',
        description: 'Basic document structure (<!DOCTYPE>, <html>, <head>, <body>).',
        level: 'Beginner',
        content: `
# HTML Introduction & Editors
Every HTML document needs a specific structure to be recognized by a browser.
- \`<!DOCTYPE html>\` declares it's an HTML5 document.
- \`<html>\` is the root element.
- \`<head>\` contains meta information (like the title).
- \`<body>\` contains the visible content.

**Your Task:**
Create the basic skeleton. Inside the \`<body>\`, add the text "My First Page".
`,
        initialCode: {
            html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Document</title>\n</head>\n<body>\n  <!-- Add content here -->\n</body>\n</html>',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<!doctype html>')) return "Missing <!DOCTYPE html>.";
            if (!lower.includes('<html>')) return "Missing <html> tag.";
            if (!lower.includes('<body>')) return "Missing <body> tag.";
            if (!lower.includes('my first page')) return "Missing 'My First Page' in body.";
            return true;
        },
        nextModule: 'html-basic'
    },
    {
        id: 'html-basic',
        track: 'HTML',
        title: 'HTML Basic & Elements',
        description: 'Understanding nested elements, root tags, and empty elements.',
        level: 'Beginner',
        content: `
# HTML Elements
An HTML element usually consists of a start tag and an end tag, with the content inserted in between:
\`<tagname>Content goes here...</tagname>\`

Some HTML elements have no content (like the \`<br>\` element). These are called empty elements. Empty elements do not have an end tag.

**Your Task:**
Write a \`<h1>\` tag containing "Hello", and inside it, add a \`<br>\` empty element.
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<h1>')) return "Missing <h1> tag.";
            if (!lower.includes('<br')) return "Missing <br> tag.";
            if (!lower.includes('hello')) return "Missing 'Hello'.";
            return true;
        },
        nextModule: 'html-attributes'
    },
    {
        id: 'html-attributes',
        track: 'HTML',
        title: 'HTML Attributes',
        description: 'Using href, src, width, height, alt, style, title.',
        level: 'Beginner',
        content: `
# HTML Attributes
Attributes provide additional information about HTML elements.
- Example: \`<a href="url">Link</a>\`
- Example: \`<img src="img.jpg" alt="A photo">\`

**Your Task:**
Create an \`<img>\` tag. Give it a \`src\` of \`"logo.png"\`, an \`alt\` of \`"Logo"\`, and a \`width\` of \`"100"\`.
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<img')) return "Missing <img> tag.";
            if (!lower.includes('src="logo.png"')) return "Missing src=\"logo.png\".";
            if (!lower.includes('alt="logo"')) return "Missing alt=\"logo\".";
            if (!lower.includes('width="100"')) return "Missing width=\"100\".";
            return true;
        },
        nextModule: 'html-headings'
    },
    {
        id: 'html-headings',
        track: 'HTML',
        title: 'HTML Headings',
        description: '<h1> to <h6> importance and SEO.',
        level: 'Beginner',
        content: `
# HTML Headings
Headings are defined with the \`<h1>\` to \`<h6>\` tags.
\`<h1>\` defines the most important heading. \`<h6>\` defines the least important heading.

**Your Task:**
Write an \`<h1>\` tag with "Main Title" and an \`<h2>\` tag with "Subtitle".
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<h1>')) return "Missing <h1> tag.";
            if (!lower.includes('<h2>')) return "Missing <h2> tag.";
            return true;
        },
        nextModule: 'html-paragraphs'
    },
    {
        id: 'html-paragraphs',
        track: 'HTML',
        title: 'HTML Paragraphs',
        description: 'The <p> tag and <br> for line breaks, <hr> for thematic breaks.',
        level: 'Beginner',
        content: `
# HTML Paragraphs
The \`<p>\` tag defines a paragraph.
The \`<hr>\` tag defines a thematic break (horizontal rule).

**Your Task:**
Create two \`<p>\` blocks. Put an \`<hr>\` between them.
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const matches = html.toLowerCase().match(/<p>/g);
            if (!matches || matches.length < 2) return "Need two <p> tags.";
            if (!html.toLowerCase().includes('<hr')) return "Missing <hr> tag.";
            return true;
        },
        nextModule: 'html-styles'
    },
    {
        id: 'html-styles',
        track: 'HTML',
        title: 'HTML Styles',
        description: 'The style attribute (color, font, size).',
        level: 'Beginner',
        content: `
# HTML Styles
The HTML \`style\` attribute is used to add styles to an element, such as color, font, size, and more.

**Example:**
\`<p style="color:red;">Text</p>\`

**Your Task:**
Create a \`<p>\` tag with a \`style\` attribute that sets \`color\` to \`blue\` and \`font-size\` to \`20px\`.
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<p ')) return "Missing styled <p> tag.";
            if (!lower.includes('style=')) return "Missing style attribute.";
            if (!lower.includes('color:') || !lower.includes('blue')) return "Style needs color: blue.";
            if (!lower.includes('font-size:') || !lower.includes('20px')) return "Style needs font-size: 20px.";
            return true;
        },
        nextModule: 'html-formatting'
    },
    {
        id: 'html-formatting',
        track: 'HTML',
        title: 'HTML Formatting',
        description: '<b>, <strong>, <i>, <em>, <mark>, <small>, <del>, <ins>, <sub>, <sup>.',
        level: 'Beginner',
        content: `
# HTML Formatting Elements
HTML contains several elements for defining text with a special meaning.
- \`<b>\` - Bold text
- \`<strong>\` - Important text
- \`<i>\` - Italic text

**Your Task:**
Write a paragraph that contains \`<strong>Bold Text</strong>\` and \`<em>Italic Text</em>\`.
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<strong>')) return "Missing <strong> tag.";
            if (!lower.includes('<em>')) return "Missing <em> tag.";
            return true;
        },
        nextModule: 'html-quotations'
    },
    {
        id: 'html-quotations',
        track: 'HTML',
        title: 'HTML Quotations',
        description: '<blockquote>, <q>, <abbr>, <address>, <cite>, <bdo>.',
        level: 'Beginner',
        content: `
# HTML Quotations
The \`<blockquote>\` element specifies a section that is quoted from another source.
The \`<q>\` tag defines a short inline quotation.

**Your Task:**
Create a \`<blockquote>\` element containing "To be or not to be".
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<blockquote')) return "Missing <blockquote> tag.";
            if (!lower.includes('to be or not to be')) return "Missing text 'To be or not to be'.";
            return true;
        },
        nextModule: 'html-comments'
    },
    {
        id: 'html-comments',
        track: 'HTML',
        title: 'HTML Comments',
        description: '<!-- Comment -->.',
        level: 'Beginner',
        content: `
# HTML Comments
HTML comments are not displayed in the browser, but they can help document your HTML source code.

\`<!-- Write your comments here -->\`

**Your Task:**
Create an HTML comment that says "This is a comment".
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            if (!html.includes('<!--') || !html.includes('-->')) return "Missing HTML comment syntax <!-- -->.";
            if (!html.toLowerCase().includes('this is a comment')) return "Comment must contain 'This is a comment'.";
            return true;
        },
        nextModule: 'html-colors'
    },
    {
        id: 'html-colors',
        track: 'HTML',
        title: 'HTML Colors',
        description: 'Understanding color names, RGB, HEX, HSL, RGBA, and HSLA.',
        level: 'Beginner',
        content: `
# HTML Colors
Colors can be specified using color names (e.g., Tomato), RGB, HEX, or HSL values.

**Your Task:**
Create an \`<h1>\` element. Set its inline style to \`background-color: Tomato;\`.
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<h1')) return "Missing <h1> tag.";
            if (!lower.includes('style=')) return "Missing style attribute.";
            if (!lower.includes('background-color:') || !lower.includes('tomato')) return "Missing background-color: Tomato.";
            return true;
        },
        nextModule: 'html-links'
    },
    {
        id: 'html-links',
        track: 'HTML',
        title: 'HTML Links',
        description: 'Hyperlinks, targets (_blank), absolute vs relative URLs, link colors.',
        level: 'Beginner',
        content: `
# HTML Links
Links are specified with the \`<a>\` tag. The \`target\` attribute specifies where to open the linked document.

**Your Task:**
Create a link to \`https://google.com\` with the text "Google". Give it a \`target="_blank"\` attribute so it opens in a new tab.
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<a ')) return "Missing <a> tag.";
            if (!lower.includes('href="https://google.com"')) return "Missing correct href.";
            if (!lower.includes('target="_blank"')) return "Missing target=\"_blank\".";
            return true;
        },
        nextModule: 'html-images'
    },
    {
        id: 'html-images',
        track: 'HTML',
        title: 'HTML Images',
        description: '<img> tag, Image Maps (<map>, <area>), Background Images, and <picture>.',
        level: 'Beginner',
        content: `
# HTML Images
The \`<img>\` tag is used to embed an image. 

**Your Task:**
Create an \`<img>\` tag with \`src="https://picsum.photos/200"\` and \`alt="Random"\`.
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<img')) return "Missing <img> tag.";
            if (!lower.includes('src="https://picsum.photos/200"')) return "Missing correct src.";
            if (!lower.includes('alt="random"')) return "Missing correct alt attribute.";
            return true;
        },
        nextModule: 'html-favicon'
    },
    {
        id: 'html-favicon',
        track: 'HTML',
        title: 'HTML Favicon & Page Title',
        description: 'Adding an icon and title to the browser tab.',
        level: 'Beginner',
        content: `
# Page Title & Favicon
The \`<title>\` element adds a title to the browser tab. The favicon is added via \`<link rel="icon">\`.

**Your Task:**
Create a \`<head>\` block containing a \`<title>\` element with the text "My Webpage".
`,
        initialCode: {
            html: '<head>\n  <!-- Add title here -->\n</head>',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<title>')) return "Missing <title> tag.";
            if (!lower.includes('my webpage')) return "Title must be 'My Webpage'.";
            return true;
        },
        nextModule: 'html-tables'
    },
    {
        id: 'html-tables',
        track: 'HTML',
        title: 'HTML Tables',
        description: '<table>, <tr>, <th>, <td>, borders, sizes, headers, padding, and colspan/rowspan.',
        level: 'Beginner',
        content: `
# HTML Tables
A table is defined with the \`<table>\` tag. Rows are \`<tr>\`, headers are \`<th>\`, and data cells are \`<td>\`.

**Your Task:**
Create a \`<table>\`. Add one \`<tr>\`. Inside that row, add two \`<th>\` tags: "Name" and "Age".
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<table')) return "Missing <table> tag.";
            if (!lower.includes('<tr')) return "Missing <tr> tag.";
            const ths = lower.match(/<th/g);
            if (!ths || ths.length < 2) return "Need two <th> tags.";
            return true;
        },
        nextModule: 'html-lists'
    },
    {
        id: 'html-lists',
        track: 'HTML',
        title: 'HTML Lists',
        description: 'Unordered (<ul>), Ordered (<ol>), and Description Lists (<dl>, <dt>, <dd>).',
        level: 'Beginner',
        content: `
# HTML Lists
\`<ul>\` creates an unordered list. \`<ol>\` creates an ordered list. Items inside are \`<li>\`.

**Your Task:**
Create an \`<ol>\` ordered list with two \`<li>\` elements containing "First" and "Second".
`,
        initialCode: {
            html: '<!-- Write your HTML here -->',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<ol')) return "Missing <ol> tag.";
            const lis = lower.match(/<li/g);
            if (!lis || lis.length < 2) return "Need two <li> tags.";
            return true;
        },
        nextModule: 'css-syntax'
    },

    // ============================================
    // LEVEL 2: CSS TRACK
    // ============================================
    {
        id: 'css-syntax',
        track: 'CSS',
        title: 'CSS Syntax & Selectors',
        description: 'Elements, IDs (#id), Classes (.class), grouping, and universal selectors.',
        level: 'Intermediate',
        content: `
# CSS Selectors
CSS is used to style elements. Selectors tell the browser WHICH elements to style.
- Element: \`h1 { color: red; }\`
- Class: \`.bg-dark { background: black; }\`
- ID: \`#header { font-size: 20px; }\`

**Your Task:**
Write CSS to make all \`<h1>\` elements \`color: red\`. Write a rule to make elements with class \`.important\` have \`font-weight: bold\`.
`,
        initialCode: {
            html: '<h1 class="important">Hello</h1>\n<h1>World</h1>',
            css: '/* Write CSS here */',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('h1') || !lower.includes('color') || !lower.includes('red')) return "Make h1 color: red.";
            if (!lower.includes('.important') || !lower.includes('font-weight') || !lower.includes('bold')) return "Make .important font-weight: bold.";
            return true;
        },
        nextModule: 'css-howto'
    },
    {
        id: 'css-howto',
        track: 'CSS',
        title: 'CSS How To',
        description: 'Inline, Internal (<style>), and External (<link>) stylesheets.',
        level: 'Intermediate',
        content: `
# CSS How To
Internal CSS is written inside a \`<style>\` tag in the HTML \`<head>\`.
Inline CSS uses the \`style\` attribute on an element directly.

**Your Task:**
Add inline CSS to the \`<body>\` tag to set \`color: green\`.
\`<body style="...">\`
`,
        initialCode: {
            html: '<!-- Update the body tag below -->\n<body>\n  <p>Test Text</p>\n</body>',
            css: '',
            js: ''
        },
        test: ({ html }) => {
            const lower = html.toLowerCase();
            if (!lower.includes('<body') || !lower.includes('style=')) return "Missing style attribute on body.";
            if (!lower.includes('inline') && !lower.includes('color:') || !lower.includes('green')) return "Make body color: green.";
            return true;
        },
        nextModule: 'css-colors'
    },
    {
        id: 'css-colors',
        track: 'CSS',
        title: 'CSS Colors',
        description: 'Applying colors to backgrounds, text, and borders.',
        level: 'Intermediate',
        content: `
# CSS Colors
Specify colors via Name (\`red\`), HEX (\`#ff0000\`), or RGB (\`rgb(255,0,0)\`).

**Your Task:**
Target the \`div\` element in CSS. Set its \`background-color\` to \`#000000\` and text \`color\` to \`#ffffff\`.
`,
        initialCode: {
            html: '<div>Dark Mode Box</div>',
            css: 'div {\n  \n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('background-color') || !lower.includes('#000000')) return "Missing background-color: #000000.";
            if (!lower.includes('color') || !lower.includes('#ffffff')) return "Missing color: #ffffff.";
            return true;
        },
        nextModule: 'css-backgrounds'
    },
    {
        id: 'css-backgrounds',
        track: 'CSS',
        title: 'CSS Backgrounds',
        description: 'background-color, image, repeat, attachment, position, and shorthand.',
        level: 'Intermediate',
        content: `
# CSS Backgrounds
The \`background-image\` property specifies an image to use as the background.

**Your Task:**
In CSS, target the \`body\`. Set \`background-image\` to \`url("bg.png")\` and set \`background-repeat\` to \`no-repeat\`.
`,
        initialCode: {
            html: '',
            css: 'body {\n  \n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('background-image:') || !lower.includes('url("bg.png")') && !lower.includes("url('bg.png')")) return "Missing background-image: url('bg.png').";
            if (!lower.includes('background-repeat:') || !lower.includes('no-repeat')) return "Missing background-repeat: no-repeat.";
            return true;
        },
        nextModule: 'css-borders'
    },
    {
        id: 'css-borders',
        track: 'CSS',
        title: 'CSS Borders',
        description: 'Style, width, color, individual sides, shorthand, and rounded borders.',
        level: 'Intermediate',
        content: `
# CSS Borders
Borders can be set via shorthand: \`border: 2px solid red;\`.
Rounded corners use \`border-radius\`.

**Your Task:**
Target \`.card\` in CSS. Add a \`border\` of \`1px solid black\` and a \`border-radius\` of \`10px\`.
`,
        initialCode: {
            html: '<div class="card">Card content</div>',
            css: '.card {\n  \n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('border:') || !lower.includes('1px') || !lower.includes('solid') || !lower.includes('black')) return "Missing border: 1px solid black.";
            if (!lower.includes('border-radius:') || !lower.includes('10px')) return "Missing border-radius: 10px.";
            return true;
        },
        nextModule: 'css-margins'
    },
    {
        id: 'css-margins',
        track: 'CSS',
        title: 'CSS Margins',
        description: 'Creating space outside elements and understanding Margin Collapse.',
        level: 'Intermediate',
        content: `
# CSS Margins
Margins clear space OUTSIDE the border of an element. Margins are completely transparent.

**Your Task:**
Target the \`.box\` class in CSS. Give it a \`margin\` of \`20px\`.
`,
        initialCode: {
            html: '<div class="box">Box</div>',
            css: '.box {\n  background: gray;\n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('margin:') || !lower.includes('20px')) return "Missing margin: 20px.";
            return true;
        },
        nextModule: 'css-padding'
    },
    {
        id: 'css-padding',
        track: 'CSS',
        title: 'CSS Padding',
        description: 'Creating space inside elements and box-sizing: border-box.',
        level: 'Intermediate',
        content: `
# CSS Padding
Padding clears space INSIDE the boundary (border) of an element.

**Your Task:**
Target \`.box\` in CSS. Add \`padding: 30px\`.
`,
        initialCode: {
            html: '<div class="box">Box</div>',
            css: '.box {\n  background: gray;\n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('padding:') || !lower.includes('30px')) return "Missing padding: 30px.";
            return true;
        },
        nextModule: 'css-height-width'
    },
    {
        id: 'css-height-width',
        track: 'CSS',
        title: 'CSS Height & Width',
        description: 'Sizing elements responsively.',
        level: 'Intermediate',
        content: `
# Height & Width
The \`height\` and \`width\` properties are used to set the size of an element.

**Your Task:**
Target \`.image-placeholder\`. Set its \`width\` to \`100%\` and its \`height\` to \`200px\`.
`,
        initialCode: {
            html: '<div class="image-placeholder"></div>',
            css: '.image-placeholder {\n  background: blue;\n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('width:') || !lower.includes('100%')) return "Missing width: 100%.";
            if (!lower.includes('height:') || !lower.includes('200px')) return "Missing height: 200px.";
            return true;
        },
        nextModule: 'css-box-model'
    },
    {
        id: 'css-box-model',
        track: 'CSS',
        title: 'CSS Box Model',
        description: 'Combining margins, borders, padding, and content.',
        level: 'Intermediate',
        content: `
# Box Model
Content + Padding + Border + Margin = Box Model.

**Your Task:**
Target \`.container\`. Give it:
1. \`width: 300px\`
2. \`padding: 20px\`
3. \`border: 5px solid gray\`
4. \`margin: 10px\`
`,
        initialCode: {
            html: '<div class="container">Content</div>',
            css: '.container {\n  \n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('width:') || !lower.includes('300px')) return "Missing width: 300px";
            if (!lower.includes('padding:') || !lower.includes('20px')) return "Missing padding: 20px";
            if (!lower.includes('border:') || !lower.includes('5px')) return "Missing border: 5px solid gray";
            if (!lower.includes('margin:') || !lower.includes('10px')) return "Missing margin: 10px";
            return true;
        },
        nextModule: 'css-outline'
    },
    {
        id: 'css-outline',
        track: 'CSS',
        title: 'CSS Outline',
        description: 'Differences between outline and borders, outline offsets.',
        level: 'Intermediate',
        content: `
# Outline
An outline is a line that is drawn around elements, OUTSIDE the borders, to make the element "stand out".
Unlike borders, outlines do not take up space.

**Your Task:**
Target \`button\` in CSS. Set \`outline\` to \`2px solid blue\`.
`,
        initialCode: {
            html: '<button>Click Here</button>',
            css: 'button {\n  border: 1px solid black;\n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('outline:') || !lower.includes('2px') || !lower.includes('solid') || !lower.includes('blue')) return "Missing outline: 2px solid blue.";
            return true;
        },
        nextModule: 'css-text'
    },
    {
        id: 'css-text',
        track: 'CSS',
        title: 'CSS Text',
        description: 'Alignment, decoration, transformation, spacing, and shadows.',
        level: 'Intermediate',
        content: `
# CSS Text
You can format text heavily in CSS.
- \`text-align: center;\`
- \`text-decoration: underline;\`
- \`text-transform: uppercase;\`

**Your Task:**
Target \`h1\`. Make it \`text-transform: uppercase\` and \`text-align: center\`.
`,
        initialCode: {
            html: '<h1>Title</h1>',
            css: 'h1 {\n  \n}',
            js: ''
        },
        test: ({ css }) => {
            const lower = css.toLowerCase();
            if (!lower.includes('text-transform:') || !lower.includes('uppercase')) return "Missing text-transform: uppercase.";
            if (!lower.includes('text-align:') || !lower.includes('center')) return "Missing text-align: center.";
            return true;
        },
        nextModule: 'js-output'
    },

    // ============================================
    // LEVEL 3: JAVASCRIPT TRACK
    // ============================================
    {
        id: 'js-output',
        track: 'JavaScript',
        title: 'JS Output & Where To',
        description: '<script> tags (head vs body), innerHTML, window.alert(), console.log().',
        level: 'Advanced',
        content: `
# JS Output
JavaScript has no built-in print function, but you can output data using \`console.log("text")\`.

**Your Task:**
Write a JavaScript command to log the word \`"Ready"\` to the console.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Write your JS here'
        },
        test: ({ js }) => {
            const lower = js.toLowerCase();
            if (!lower.includes('console.log') || !lower.includes('ready')) return "Use console.log('Ready')";
            return true;
        },
        nextModule: 'js-syntax'
    },
    {
        id: 'js-syntax',
        track: 'JavaScript',
        title: 'JS Syntax & Statements',
        description: 'Values, literals, variables, expressions, keywords.',
        level: 'Advanced',
        content: `
# Syntax
JavaScript syntax is the set of rules, how JavaScript programs are constructed.
A JavaScript program is a list of statements.

**Your Task:**
Declare a variable \`x\`, assign it the value \`5\`. Declare \`y\`, assign it \`6\`. Assign their sum to \`z\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: 'let x = 5;\nlet y = 6;\n// Calculate z here\n'
        },
        test: ({ js }) => {
            const lower = js.replace(/\s+/g, '');
            if (!lower.includes('letz=') && !lower.includes('z=') && !lower.includes('constz=')) return "Declare z.";
            if (!lower.includes('z=x+y') && !lower.includes('z=5+6')) return "Assign x + y to z.";
            return true;
        },
        nextModule: 'js-variables'
    },
    {
        id: 'js-variables',
        track: 'JavaScript',
        title: 'JS Variables',
        description: 'var, let, and const (block scope vs function scope).',
        level: 'Advanced',
        content: `
# Variables
\`let\` creates block-scoped variables. \`const\` creates constants.

**Your Task:**
Declare a constant named \`PI\` and assign it \`3.14159\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Write JS here'
        },
        test: ({ js }) => {
            if (!js.includes('const PI = 3.14159') && !js.includes('const PI=3.14159')) return "Declare const PI appropriately.";
            return true;
        },
        nextModule: 'js-operators'
    },
    {
        id: 'js-operators',
        track: 'JavaScript',
        title: 'JS Operators',
        description: 'Arithmetic, Assignment, String, and Logical operators.',
        level: 'Advanced',
        content: `
# Operators
\`+\` adds, \`*\` multiplies, \`===\` checks equality.

**Your Task:**
Create a variable \`a\` = 10, \`b\` = 5. Create \`c\` = \`a * b\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: 'let a = 10;\nlet b = 5;\n// Calculate c\n'
        },
        test: ({ js }) => {
            const lower = js.replace(/\s+/g, '');
            if (!lower.includes('c=a*b') && !lower.includes('c=10*5')) return "Calculate c as a * b.";
            return true;
        },
        nextModule: 'js-datatypes'
    },
    {
        id: 'js-datatypes',
        track: 'JavaScript',
        title: 'JS Data Types',
        description: 'Strings, Numbers, BigInt, Booleans, Undefined, Null, Symbols, Objects.',
        level: 'Advanced',
        content: `
# Data Types
JavaScript evaluates expressions to data types.
\`"Apple"\` is a String. \`true\` is a Boolean.

**Your Task:**
Create a variable \`isLearning\` and set it to the boolean value \`true\`.
Create a variable \`name\` and set it to the string value \`"John"\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Write JS here'
        },
        test: ({ js }) => {
            const lower = js.toLowerCase();
            if (!lower.includes('true')) return "Missing boolean true.";
            if (!lower.includes('john')) return "Missing string 'John'.";
            return true;
        },
        nextModule: 'js-functions'
    },
    {
        id: 'js-functions',
        track: 'JavaScript',
        title: 'JS Functions',
        description: 'Defining functions, parameters, return values, invocation, and Arrow Functions.',
        level: 'Advanced',
        content: `
# Functions
Functions encapsulate reusable code.

**Your Task:**
Write a function called \`greet\` that takes a \`name\` parameter and returns \`"Hello " + name\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Write function here'
        },
        test: ({ js }) => {
            const lower = js.toLowerCase();
            if (!lower.includes('function greet') && !lower.includes('greet =')) return "Define a function named 'greet'.";
            if (!lower.includes('return')) return "Missing return keyword.";
            if (!lower.includes('hello')) return "Missing greeting 'Hello'.";
            return true;
        },
        nextModule: 'js-objects'
    },
    {
        id: 'js-objects',
        track: 'JavaScript',
        title: 'JS Objects',
        description: 'Properties, Methods, the this keyword, Object constructors.',
        level: 'Advanced',
        content: `
# Objects
Objects store properties (data) and methods (functions) inside curly brackets \`{}\`.

**Your Task:**
Create an object called \`person\` with properties \`firstName\` set to \`"John"\` and \`age\` set to \`30\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Write JS here'
        },
        test: ({ js }) => {
            const lower = js.replace(/\s+/g, '').toLowerCase();
            if (!lower.includes('person={') && !lower.includes('person:')) return "Define an object called person.";
            if (!lower.includes('firstname:"john"')) return "Missing firstName: 'John'.";
            if (!lower.includes('age:30')) return "Missing age: 30.";
            return true;
        },
        nextModule: 'js-string-methods'
    },
    {
        id: 'js-string-methods',
        track: 'JavaScript',
        title: 'JS Strings & Methods',
        description: 'Escaping characters, templates (${}), length, slice(), substring(), replace(), toUpperCase().',
        level: 'Advanced',
        content: `
# String Methods
Strings have properties like \`.length\` and methods like \`.toUpperCase()\`.

**Your Task:**
Create a variable \`text = "hello"\`. Create a variable \`capText\` that is set to \`text\` converted to uppercase using an inbuilt JS method.
`,
        initialCode: {
            html: '',
            css: '',
            js: 'let text = "hello";\n// Write JS here'
        },
        test: ({ js }) => {
            const lower = js.toLowerCase();
            if (!lower.includes('touppercase()')) return "Use the toUpperCase() method.";
            if (!lower.includes('captext')) return "Assign it to capText.";
            return true;
        },
        nextModule: 'js-number-methods'
    },
    {
        id: 'js-number-methods',
        track: 'JavaScript',
        title: 'JS Numbers & Methods',
        description: 'Decimals, NaN, Infinity, toString(), toFixed(), parseInt().',
        level: 'Advanced',
        content: `
# Number Methods
\`toFixed()\` returns a string, with the number written with a specified number of decimals.

**Your Task:**
Create a variable \`num = 5.56789\`. Create \`shortNum\` by calling \`.toFixed(2)\` on \`num\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: 'let num = 5.56789;\n// Write JS here'
        },
        test: ({ js }) => {
            const lower = js.toLowerCase();
            if (!lower.includes('tofixed(2)')) return "Use .toFixed(2).";
            if (!lower.includes('shortnum')) return "Assign it to variable shortNum.";
            return true;
        },
        nextModule: 'js-arrays'
    },
    {
        id: 'js-arrays',
        track: 'JavaScript',
        title: 'JS Arrays & Methods',
        description: 'Creating arrays, accessing elements, push(), pop(), shift(), unshift(), splice(), slice().',
        level: 'Advanced',
        content: `
# Arrays
Arrays hold multiple values. You can add items using \`.push()\`.

**Your Task:**
Create an array called \`fruits\` containing \`"Apple"\` and \`"Banana"\`. Then, use the \`.push()\` method to add \`"Orange"\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Write JS here'
        },
        test: ({ js }) => {
            const lower = js.toLowerCase();
            if (!lower.includes('fruits')) return "Define 'fruits' array.";
            if (!lower.includes('apple') || !lower.includes('banana')) return "Add Apple and Banana.";
            if (!lower.includes('push') || !lower.includes('orange')) return "Push Orange into the array.";
            return true;
        },
        nextModule: 'js-conditionals'
    },
    {
        id: 'js-conditionals',
        track: 'JavaScript',
        title: 'JS Conditionals',
        description: 'if, else, else if, ternary operators, and switch statements.',
        level: 'Advanced',
        content: `
# Conditionals
Use \`if\` to specify a block of code to be executed, if a specified condition is true.

**Your Task:**
Write an \`if\` statement. If \`x > 5\`, set a variable \`isBig\` to \`true\`. Else, set it to \`false\`. Assume \`x\` is predefined.
`,
        initialCode: {
            html: '',
            css: '',
            js: 'let x = 10;\nlet isBig;\n// Write logic here'
        },
        test: ({ js }) => {
            const lower = js.replace(/\s+/g, '').toLowerCase();
            if (!lower.includes('if(x>5)')) return "Use if(x > 5).";
            if (!lower.includes('isbig=true')) return "Set isBig to true.";
            if (!lower.includes('else')) return "Use else.";
            if (!lower.includes('isbig=false')) return "Set isBig to false.";
            return true;
        },
        nextModule: 'js-loops'
    },
    {
        id: 'js-loops',
        track: 'JavaScript',
        title: 'JS Loops',
        description: 'for, for/in, for/of, while, do/while, break, and continue.',
        level: 'Advanced',
        content: `
# Loops
Loops execute a block of code a number of times.

**Your Task:**
Write a \`for\` loop starting at \`i = 0\`, running while \`i < 5\`, and iterating \`i++\`.
Inside the loop, do nothing.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Write a for loop here'
        },
        test: ({ js }) => {
            const lower = js.replace(/\s+/g, '').toLowerCase();
            if (!lower.includes('for(')) return "Write a for loop.";
            if (!lower.includes('i=0') || !lower.includes('i<5') || !lower.includes('i++')) return "Use loop signature (let i = 0; i < 5; i++).";
            return true;
        },
        nextModule: 'js-scope'
    },
    {
        id: 'js-scope',
        track: 'JavaScript',
        title: 'JS Scope & Hoisting',
        description: 'Global vs local vs block scope, and variable hoisting.',
        level: 'Advanced',
        content: `
# Scope
Scope determines the accessibility (visibility) of variables.
Variables declared inside a \`{ }\` block with \`let\` cannot be accessed from outside.

**Your Task:**
Declare a global variable \`g = 1\`. Then create an \`if(true)\` block. Inside the block, declare a local variable \`let l = 2\`.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Write JS here'
        },
        test: ({ js }) => {
            const lower = js.replace(/\s+/g, '').toLowerCase();
            if (!lower.includes('letg=1') && !lower.includes('constg=1') && !lower.includes('varg=1')) return "Declare global g.";
            if (!lower.includes('if(true)')) return "Create if(true) block.";
            if (!lower.includes('letl=2')) return "Declare local let l = 2.";
            return true;
        },
        nextModule: 'js-strict'
    },
    {
        id: 'js-strict',
        track: 'JavaScript',
        title: 'JS Strict Mode',
        description: '"use strict" directives.',
        level: 'Advanced',
        content: `
# Strict Mode
"use strict" indicates that the code should be executed in "strict mode".
With strict mode, you can not, for example, use undeclared variables.

**Your Task:**
Enable strict mode at the top of your script.
`,
        initialCode: {
            html: '',
            css: '',
            js: '// Enable strict mode\n'
        },
        test: ({ js }) => {
            const lower = js.toLowerCase();
            if (!lower.includes('"use strict"') && !lower.includes("'use strict'")) return "Add 'use strict' directive.";
            return true;
        },
        nextModule: null
    }
];
