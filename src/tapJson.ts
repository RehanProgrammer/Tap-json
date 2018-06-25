import * as tapTypes from './tap-types'
//import * as configLoader from './tap-load-config'

var DataTransform = require('node-json-transform').DataTransform
var fse = require('fs-extra')
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

var ap = {
  list: 'posts',
  item: {
    name: 'title',
    info: 'description',
    text: 'blog',
    date: 'date',
    link: 're',
    item: 'list1.0.name',
    item1: 'list2.0.item',
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
var map1 = {
  //list : 'posts',
  list: 'products',
  item: {
    name: 'subitems.1.subid'
    /*info: "stream",
        text: "time_extracted",
        date: "time_extracted",
        link: "record.0.attachments",
        item: "record.0.html"
       // fieldGroup: ['title', 'extra']*/
  }
}
/*each: function(item:any){
        // make changes
        item.iterated = true;
        return item;
    }*/

async function readContent(callback: any) {
  const testFilePath = 'C:\\tap-ts-starter\\testdata\\emails-expectedResults\\test.json'
  await fse.readFile(testFilePath, function(err: any, content: any) {
    if (err) return callback(err)
    callback(null, content)
  })
}
/*export async function transform_JSON(){//this function was for testing purposes
    
    try {  
        const testFilePath = 'C:\\tap-ts-starter\\testdata\\myTestData\\test.json';
       var data1 = await fse.readFile(testFilePath, 'utf8');
       
       data1 = JSON.parse(data1);
       console.log(data);
       console.log(data1);
        var dataTransform = DataTransform(data1, map1);  //the error is while reading 
                                                       //the file.
        var result = dataTransform.transform();//getting error here
        console.log(JSON.stringify(result));
       //console.log(data1);    
    } catch(e) {
        
        console.log('Error:', e.stack);//convert file read to an array
    }
}*/

export async function parseJson(buffer: any, configObjs: tapTypes.allConfigs) {
  let config = configObjs.config
  let parsed = await buffer
  parsed = JSON.parse(parsed)
  console.log(parsed)
  var map = await fse.readFile(config.target_map_file)
  var dataTransform = DataTransform(parsed, map)
  var result = dataTransform.transform()
  console.log(result)
  let rec = new tapTypes.streamRecord()
  rec.stream = 'JSON transform'
  rec.time_extracted = new Date()
  rec.record = result
  console.log(rec)
  return rec
}

/*buffer = JSON.parse(buffer);
     let config = configObjs.config;
     var map;
     console.log(config.target_map_file);
    // let maplist: string[] = await fse.readdir(config.target_map_folder as string);
        
        map = await fse.readFile(config.target_map_file);
        map = JSON.parse(map);
    var dataTransform = DataTransform(buffer, map);
    var result = dataTransform.transform();
     console.log(result);
    return result*/

/*
 let parsed = await sp(mimeEmail) // sp returns a promise; await waits for it, strips the result out and puts that result into the "parsed" variable

  let rec = new tapTypes.streamRecord()
  rec.stream = 'email'
  rec.time_extracted = new Date()
  rec.record = parsed
  return rec
 */
//task: pass the map function configOBJ. add a line in emails.tap-config.json for reading the map function.

// console.log(data1);
/*
   var data1 =readContent(function (err:any,content:any){
        // console.log(JSON.stringify(content));
        })
    console.log(JSON.stringify(data1));
    var dataTransform = DataTransform(data1, map1);
        var result = dataTransform.transform();
        console.log(JSON.stringify(result));
}*/
//list : 'posts',
/*info: "stream",
        text: "time_extracted",
        date: "time_extracted",
        link: "record.0.attachments",
        item: "record.0.html"
       // fieldGroup: ['title', 'extra']*/
