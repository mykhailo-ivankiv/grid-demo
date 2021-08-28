export const template = ({ title, source }) => `<div class="block">
  <h4>${title.value}</h4>
  <iframe width="100%" height="350" src="${source.value}" frameborder="0" allowfullscreen></iframe>
</div>
`

export const settings = {
  source: {
    type: 'text',
    value: 'http://www.youtube.com/embed/wCkerYMffMo',
    description: 'Video URL',
  },

  title: {
    type: 'string',
    value: 'BANANA!!',
    description: 'Title',
  },
}
