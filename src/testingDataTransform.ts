var DataTransform = require('node-json-transform').DataTransform
var map = {
  list: 'posts',
  item: {
    name: 'title',
    info: 'description',
    text: 'blog',
    date: 'date',
    link: 'extra.link',
    item: 'list1.0.name',
    clearMe: '',
    fieldGroup: ['title', 'extra']
  },
  operate: [
    {
      run: 'Date.parse',
      on: 'date'
    },
    {
      run: function(val: any) {
        return val + ' more info'
      },
      on: 'info'
    }
  ],
  each: function(item: any) {
    // make changes
    item.iterated = true
    return item
  }
}
var data = {
  posts: [
    {
      title: 'title1',
      description: 'description1',
      blog: 'This is a blog.',
      date: '11/4/2013',
      extra: {
        link: 'http://goo.cm'
      },
      list1: [
        {
          name: 'mike'
        }
      ],
      list2: [
        {
          item: 'thing'
        }
      ],
      clearMe: 'text'
    }
  ]
}
export function test() {
  var dataTransform = DataTransform(data, map)
  var result = dataTransform.transform()
  console.log(JSON.stringify(result))
}
