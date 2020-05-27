const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a api',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'api name please',
    validate: notEmpty('name')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [
      {
        name: '<script>',
        value: 'script',
        checked: true
      }
    ],
    validate(value) {
      if (value.indexOf('script') === -1) {
        return 'Api require at least a <script> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/api/${name}/index.js`,
      templateFile: 'plop-templates/api/index.hbs',
      data: {
        name: name,
        script: data.blocks.includes('script')
      }
    }]
    return actions
  }
}
