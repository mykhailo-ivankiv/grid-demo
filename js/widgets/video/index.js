export const template = ({ title, source }) => `<div class="block">
  <h4>${title.value}</h4>
  <iframe width="100%" height="350" src="https://www.youtube.com/embed/65Co1eTbqzo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  
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
