export const template = ({ header, fields, option, submit }) => `
<div class="block">
  <h4>${header.value}</h4>

  <form action="#">
    ${fields.fields
      .map(
        ({ label, value, placeholder, type, required, rows, cols, options, checked }) => `
          <fieldset>
            <label>${label}</label>
            ${
              type === 'string'
                ? `<input type="text" value="${value}" placeholder="${placeholder}" ${required ? 'required' : ''} />`
                : ''
            }
            
            ${
              type === 'text'
                ? `<textarea rows="${rows}" cols="${cols}" value="${value}" placeholder="${placeholder}"
                             ${required ? 'required' : ''} />`
                : ''
            }
            
            ${
              type === 'select'
                ? `<select>
                    ${options
                      .map(({ name, value, label }) => `<option name="${name}" value="${value}">${label}</option>`)
                      .join('')}
                  </select>`
                : ''
            }
    
            ${
              type === 'checkbox'
                ? `<input type="checkbox" value="${value}" ${checked ? 'checked' : ''} ${required ? required : ''}/>`
                : ''
            }
            
            
          </fieldset>
      `,
      )
      .join('')}
      
      <fieldset class="submit">
        <button type="submit">${submit.value}</button>
      </fieldset>
    </form>    
</div>
`
export const settings = {
  header: {
    type: 'string',
    value: 'Happy Form',
    description: 'Form name',
  },
  fields: {
    type: 'form',
    fields: [
      {
        type: 'string',
        label: 'Field 1:',
        value: '',
        placeholder: 'Please, input happy face here...',
        required: true,
      },
      {
        type: 'string',
        label: 'Field 2:',
        value: ':o)',
        placeholder: 'Please, input happy face here...',
        required: true,
      },
      {
        type: 'text',
        label: 'Field 3:',
        value: '',
        placeholder: '',
        required: true,
        rows: 10,
        cols: 10,
      },
      {
        type: 'select',
        label: 'Field 4:',
        required: true,
        options: [
          {
            name: 'option1',
            label: 'option1',
            value: 'option 1',
          },
          {
            name: 'option2',
            label: 'option2',
            value: 'option 2',
          },
          {
            name: 'option3',
            label: 'option3',
            value: 'option 3',
          },
        ],
      },
      {
        type: 'checkbox',
        label: 'Field 5:',
        value: '0',
        checked: true,
        required: true,
      },
    ],
  },
  submit: {
    type: 'string',
    value: 'Be happy!',
    description: 'Text for Submit button',
  },
}
