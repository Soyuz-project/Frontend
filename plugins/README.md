# PLUGINS

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains Javascript plugins that you want to run before mounting the root Vue.js application.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/plugins).

# APP FLOW

```
1. Read
Run after init DataFrame component

                                    ^---------------------^
      ^----------------------^       [ soyuz-store-api.js  ] 
      [ soyuz-actions-router ]       [     load(event)     ]
      [  storeRouter()       ]       ^---------------------^
      ^----------------------^         ||
             /\     		               || event
             ||     	                 \/
   ^================^          ^---------------------^
   [  DataFrame.js  ] =======> [ soyuz-events-api.js ] 
   [  (component)   ]          [ runEvent(event)     ]
   ^================^          ^---------------------^ 
							                       || get READ event
         /\           	             \/
         ||               ^---------------------^
         \==============  [ soyuz-event-read.js ] 
           return data    [   load(page)        ]
           to render      ^---------------------^
                 



2. User Action 	
after component (with defined actions) interaction:
 
 ^===================^     ^----------------------^
 [ soyuz-targeter.js ] ==> [ soyuz-actions-api.js ] 
 [ (actions)         ]     [  (runActions)        ] 
 ^===================^     ^----------------------^ 
                                 ||
                                 \/
 								
 						  		    Run actions
 							  	    ---------------------
 							  	    actionKey:{attrs}
                      ---------------------
                      actionKey:{attrs}
 							  	    ---------------------       ^---------------------^        ^----------------------^
 							  /	=>  event:event_slug       ==>  [ soyuz-events-api.js ]  ==>   [ soyuz-actions-api.js ]
 							  ||    ---------------------       [ runEvent(event)     ]        [  (runActions)        ] 
                ||                                ^---------------------^        ^----------------------^ 
 								||                                                                     ||
                ||                                                                     \/
                ||                                                                   Run actions
                ||                                                                   ---------------------
                \================================================================    actionKey:{attrs}

                      actionKey:{attrs}
                      ---------------------
                      actionKey:{attrs}




```
