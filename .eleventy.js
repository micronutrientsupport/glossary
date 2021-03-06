module.exports = function(eleventyConfig) {

  
  eleventyConfig.addCollection('terms', function(collection) {
	  //console.log(collection);
	  let a = collection.getAllSorted().filter(item => { 
		
		if(item.inputPath.startsWith('./terms/')) {
			if(item.template.frontMatter.content === '') {
				item.data.permalink = false;
				item.data.hasExtraContent = false;
				item.data.slug = item.template.parsed.name
			}
			else {
				item.data.hasExtraContent = true;
				item.data.slug = item.template.parsed.name;
				item.data.extraContentSlug = item.template.parsed.name;
			}
		}			
		return item.inputPath.startsWith('./terms/')	  
	  });

	return a.sort((a, b) => {
		return a.data.title > b.data.title
	})

   //console.log(a)
   //return a;
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("CNAME");
	
  eleventyConfig.addFilter("getPrevTerm", function(collection, title) { 
	let itemIndex = collection.findIndex((item) => item.data.title === title);
	if(itemIndex >= 0) {	
	 	let found = false;
	 	let outofBounds = false;
	 	let currIndex = itemIndex - 1;
	 	while(!(found || outofBounds)) {
			if (currIndex >= 0) {
				if(collection[currIndex].data.hasExtraContent) {
					found = true;
				}
				else {
					currIndex--;
				}
			}
			else {
				outofBounds = true;
			}
		}
		if(currIndex >= 0 && !outofBounds) {
			return {
				title: collection[currIndex].data.title,
				slug: collection[currIndex].data.slug
			}
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
   });

  eleventyConfig.addFilter("getNextTerm", function(collection, title) { 
	let itemIndex = collection.findIndex((item) => item.data.title === title);
	if(itemIndex >= 0) {	
	 	let found = false;
	 	let outofBounds = false;
	 	let currIndex = itemIndex + 1;
	 	while(!(found || outofBounds)) {
			if (currIndex < collection.length) {
				if(collection[currIndex].data.hasExtraContent) {
					found = true;
				}
				else {
					currIndex++;
				}
			}
			else {
				outofBounds = true;
			}
		}
		if(currIndex <= collection.length && !outofBounds) {
			return {
				title: collection[currIndex].data.title,
				slug: collection[currIndex].data.slug
			}
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
   });

   eleventyConfig.addFilter("getSlugForTitle", function(collection, title) { 
	let item = collection.find((item) => item.data.title === title);
	if(item) {
		return item.data.slug
	}
	else {
		return false
	}
   });
   
   eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
	   if(!content) {
	//	console.log("Hello");
	   }
	//   console.log(outputPath);
	//   console.log(content);
	   return content;
   });
  
  
  // You can return your Config object (optional).
  return {
 //   dir: {
//      input: "views"
 //   }
  };
};