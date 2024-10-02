const logger = (options) =>
    (req, res, next) => { 
      const timestamp = new Date().toUTCString(); 
        const { method, url} = req; 
          console.log(`
              ${timestamp} 
              ${options.level}:
              Method: ${method},
              Url: ${url} `); 
            next(); 
    };
    
module.exports = logger; 