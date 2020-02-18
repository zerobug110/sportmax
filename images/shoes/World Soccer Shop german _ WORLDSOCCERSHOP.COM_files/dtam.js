(function () {
  // { kind: :tsc, options: {"token"=>"MeL"} }
  this.functions["15acfc138eb8bf314613068d86211612"] = function() { (function(){
    var nodes = document.querySelectorAll("iframe[src*=\"//tcapi.io\"]")
    if (nodes && nodes.length>0) {
            this.observers["15acfc138eb8bf314613068d86211612"].disconnect()
        this.performance.iInsert         = (new window.Date()).getTime()
    }
  } ).call(window.thrive) } 
  this.observers["15acfc138eb8bf314613068d86211612"] = new MutationObserver(this.functions["15acfc138eb8bf314613068d86211612"])
  this.observers["15acfc138eb8bf314613068d86211612"].observe(document.querySelector('html'),{childList:true,subtree:true})
  this.functions["15acfc138eb8bf314613068d86211612"].call()
  this.functions["8108aa271c74346ad4363a961d116ae7"] = function() { (function(){
    var nodes = document.querySelectorAll("link[rel=\"canonical\"][data-mod-by=\"thrive\"]")
    if (nodes && nodes.length>0) {
            this.observers["8108aa271c74346ad4363a961d116ae7"].disconnect()
        this.performance.canonicalInsert = (new window.Date()).getTime()
    }
  } ).call(window.thrive) } 
  this.observers["8108aa271c74346ad4363a961d116ae7"] = new MutationObserver(this.functions["8108aa271c74346ad4363a961d116ae7"])
  this.observers["8108aa271c74346ad4363a961d116ae7"].observe(document.querySelector('html'),{childList:true,subtree:true})
  this.functions["8108aa271c74346ad4363a961d116ae7"].call()
  this.functions["1782ed18fe8b4b44e055b203301a988a"] = function() { (function(){
    var nodes = document.querySelectorAll("title[data-mod-by=\"thrive\"]")
    if (nodes && nodes.length>0) {
            this.observers["1782ed18fe8b4b44e055b203301a988a"].disconnect()
        this.performance.titleInsert     = (new window.Date()).getTime()
    }
  } ).call(window.thrive) } 
  this.observers["1782ed18fe8b4b44e055b203301a988a"] = new MutationObserver(this.functions["1782ed18fe8b4b44e055b203301a988a"])
  this.observers["1782ed18fe8b4b44e055b203301a988a"].observe(document.querySelector('html'),{childList:true,subtree:true})
  this.functions["1782ed18fe8b4b44e055b203301a988a"].call()
  this.new_nodes["d4b91cec79a0e4a5d0e99407db8fa138"] = document.createElement("style")
  this.new_nodes["d4b91cec79a0e4a5d0e99407db8fa138"].innerHTML='#tsc_wrapper { width:100%; } @media (min-width: 480px) { #tsc_wrapper { width: 310px; }}'
  this.new_nodes["d4b91cec79a0e4a5d0e99407db8fa138"].setAttribute("data-mod-by",'thrive')
  this.functions["dbe8c6b8146b7c2237e684d3f12a65ac"] = function() { (function(){
    var nodes = document.querySelectorAll("head")
    if (nodes && nodes.length>0) {
            this.observers["dbe8c6b8146b7c2237e684d3f12a65ac"].disconnect()
        nodes[0].appendChild(this.new_nodes["d4b91cec79a0e4a5d0e99407db8fa138"])
    }
  } ).call(window.thrive) } 
  this.observers["dbe8c6b8146b7c2237e684d3f12a65ac"] = new MutationObserver(this.functions["dbe8c6b8146b7c2237e684d3f12a65ac"])
  this.observers["dbe8c6b8146b7c2237e684d3f12a65ac"].observe(document.querySelector('html'),{childList:true,subtree:true})
  this.functions["dbe8c6b8146b7c2237e684d3f12a65ac"].call()

  this.new_nodes["a0354c68a28ea4dac5fe3da6256c8032"] = document.createElement("div")
  this.new_nodes["a0354c68a28ea4dac5fe3da6256c8032"].setAttribute("id",'tsc_wrapper')
  this.new_nodes["a0354c68a28ea4dac5fe3da6256c8032"].setAttribute("style",'position:fixed; border:none; border-radius:3px; bottom:0; right:0; left:0; height:60px; z-index:9999999; background-color: rgba(0,0,0,0.8); margin: 0 auto;')
  this.new_nodes["a0354c68a28ea4dac5fe3da6256c8032"].setAttribute("data-mod-by",'thrive')
  this.functions["9e74573728f73b37f9065211a714a283"] = function() { (function(){
    var nodes = document.querySelectorAll("body")
    if (nodes && nodes.length>0) {
            this.observers["9e74573728f73b37f9065211a714a283"].disconnect()
        nodes[0].insertBefore(this.new_nodes["a0354c68a28ea4dac5fe3da6256c8032"],nodes[0].firstChild)
    }
  } ).call(window.thrive) } 
  this.observers["9e74573728f73b37f9065211a714a283"] = new MutationObserver(this.functions["9e74573728f73b37f9065211a714a283"])
  this.observers["9e74573728f73b37f9065211a714a283"].observe(document.querySelector('html'),{childList:true,subtree:true})
  this.functions["9e74573728f73b37f9065211a714a283"].call()


  this.gte_tsc = function(caveat) {
    if (caveat===undefined) {
      caveat = null
    }
    this.gte("tsc", {
      'token':    "MeL",
      'category': "all",
      'site':     "worldsoccershop.com",
      'tsckind':  "dbtsc",
      'caveat':   caveat
    } )
    this.gte_send()
  }



  this.ga = function(action, label, value, nonInteraction) {
    if (window.ga && typeof window.ga === 'function') {
      if ('getAll' in window.ga) { var trackers = window.ga.getAll()
        if (trackers && trackers.length > 0) {
          (function () { var sentHash = {}
            trackers.forEach(function (tracker) {
              if (tracker) {
                var id = tracker.get('trackingId').toLowerCase()
                if (id && !sentHash[id]) {
                  if (value) { tracker.send('event', 'Thrive', action, label, value, { nonInteraction: !!nonInteraction }) }
                  else       { tracker.send('event', 'Thrive', action, label,        { nonInteraction: !!nonInteraction }) }
                  sentHash[id] = true;
                }
              }
            });
          })();
        }
      } else {
        if (value) { window.ga('send', 'event', 'Thrive', action, label, value, { nonInteraction: !!nonInteraction }) }
        else       { window.ga('send', 'event', 'Thrive', action, label,        { nonInteraction: !!nonInteraction }) }
      }
    }
  }
  this.reveal = function(offer_id, title, instore) {
    if (instore===undefined) {
      instore = false
    }
    var reveal   = document.createElement('iframe')
    reveal.src   = 'https://tcapi.io/MeL/offers/' + offer_id + '/' + (instore?'instore_':'') + 'reveal' +
      '?consumer=' + this.get_cookie('va6uyAb') +
      '&pv_uuid=' + this.pv_uuid +
      '&window_location_href=' + encodeURIComponent(window.location.href)
    reveal.id    = 'tsc' + (instore?'-instore':'') + '-reveal'
    reveal.style.cssText = 'position: fixed; top: 0px; left: 0px; bottom: 0px; height: 100%; width: 100%; z-index: 9999999; border: none;'
    document.querySelector('body').appendChild(reveal)
    this.gte("offer_engagement", {
      'kind':     'reveal',
      'token':    "MeL",
      'offer_id': offer_id,
      'name':     title,
      'in_store': ( instore ? 1 : 0 ),
      'category': "all",
      'site':     "worldsoccershop.com",
      'tsckind':  "dbtsc"
    } )
    this.gte_send()
  }
  this.aacFunction = function(code, callback) {
    var xhr = new XMLHttpRequest()
  xhr.open('POST', '/PromotionCodeManage' )
  xhr.setRequestHeader('content-type', 'text/html; charset=UTF-8')
  xhr.onload = function() {
    var tmp_doc = document.implementation.createHTMLDocument().documentElement
    tmp_doc.innerHTML = xhr.responseText
    if ( tmp_doc.querySelector('.error-alert') ) {
      console.log( tmp_doc.querySelector('.error-alert').innerText )
      callback(true, 'Applied')
    } else {
      callback( false, 'Error' )
    }
  }
  xhr.send('taskType=A&errorViewName=InvalidInputErrorView&promoCode='+encodeURIComponent(code))

  }
  window.addEventListener('message', function (msg) {

    if (msg.origin != "https://tcapi.io") return
        
    switch (msg.data.type) {
      case 'exitDealbar':
        document.querySelector('#tsc_wrapper').style.display = 'none';
        break
      case 'checkFirstVisit':
        var firstVisitCookie = window.thrive.get_cookie('firstVisit');
        if (false) {
          firstVisitCookie = false;
        } else if (typeof(firstVisitCookie) == 'undefined') {
          var domain = window.thrive.get_top_cookieable_domain();
          window.thrive.set_cookie('firstVisit', false, domain, 0);
          firstVisitCookie = true;
        }
        document.querySelector('#tsc').contentWindow.postMessage({type: 'firstVisitResponse', data: { isFirst: firstVisitCookie, isMobile: (window.innerWidth < 480) }}, 'https://tcapi.io');
        break
      case 'openDealbar':    
        document.querySelector('#tsc_wrapper').style.cssText = 'position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; z-index: 9999999; background-color: rgba(0,0,0,0.8); transition: background-color 0.7s ease;';
        document.querySelector('#tsc').style.cssText = 'height: 100%; width: 100%; overflow-y: hidden;';
        var thrive_scroll_stop = document.createElement("style")
        thrive_scroll_stop.innerHTML='html { overflow:hidden !important }'
        thrive_scroll_stop.setAttribute("data-mod-by",'thrive')
        thrive_scroll_stop.setAttribute("id",'thrive_scroll_stop')
        if (document.querySelector("body")) { document.querySelector("body").appendChild(thrive_scroll_stop) }
        window.thrive.gte_tsc( msg.data.caveat );
        break
      case 'fadeDealbar': 
        document.querySelector('#tsc_wrapper').style.backgroundColor = 'unset';
        break
      case 'closeDealbar':   
        document.querySelector('#tsc_wrapper').style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; height: 60px; z-index: 9999999; margin: 0 auto;'; 
        if (document.querySelector('#thrive_scroll_stop')) { document.querySelector('#thrive_scroll_stop').remove() }
        break
      case 'printmarkup':    var popup = window.open('about:blank', '_new'); popup.document.write(msg.data.data.markup); popup.focus();                               break

        case 'height':         document.querySelector('#tsc').style.cssText = 'height:' + msg.data.data.height.toString() + 'px !important; width: 100%; overflow-y: hidden;';  break
        
      case 'gte':            
        if (msg.data.gte_class_name=='offer_engagement') { msg.data.gte_object["site"] = "worldsoccershop.com" };
        window.thrive.gte(msg.data.gte_class_name, msg.data.gte_object); window.thrive.gte_send();           
        break
      case 'ga':             window.thrive.ga(msg.data.data.action, msg.data.data.label, msg.data.data.value, msg.data.data.nonInteraction);        break
      case 'instorereveal':  window.thrive.reveal(msg.data.data.offerId, msg.data.data.offerTitle, true);                                           break
      case 'reveal':         window.thrive.reveal(msg.data.data.offerId, msg.data.data.offerTitle);                                                 break
      case 'modalclose':     var m = document.querySelector('#tsc-reveal, #tsc-instore-reveal'); m.parentNode.removeChild(m);                       break
      case 'applyCode':      
        window.thrive.aacFunction(msg.data.data.code, function(success, msg) {
          document.querySelector('#tsc-reveal').contentWindow.postMessage( { type: success ? 'aacSuccess' : 'aacFailure', data: { msg: msg } }, 'https://tcapi.io'); 
        });    
        break
      case 'applyDealbarCode': 
        var db_offer_id = msg.data.data.offer_id;
        window.thrive.aacFunction(msg.data.data.code, function(success, msg) {
          document.querySelector('#tsc').contentWindow.postMessage( { type: success ? 'aacSuccess' : 'aacFailure', data: { msg: msg, offer_id: db_offer_id } }, 'https://tcapi.io'); 
        });    
        break
    }
  })

  if (this.get_fragment_param('thrive_reveal'        )) this.reveal(this.get_fragment_param('thrive_reveal'        ), ''      )
  if (this.get_fragment_param('thrive_instore_reveal')) this.reveal(this.get_fragment_param('thrive_instore_reveal'), '', true)
  this.new_nodes["e4cd82bec0b733e8263559b72bf1b830"] = document.createElement("style")
  this.new_nodes["e4cd82bec0b733e8263559b72bf1b830"].innerHTML="#tsc { width:100%; !important; display:block !important; margin:auto !important; height: 1280px; }"
  this.new_nodes["e4cd82bec0b733e8263559b72bf1b830"].setAttribute("data-mod-by",'thrive')
  this.functions["cb8f689322bdb344b8e7f8b75316ea62"] = function() { (function(){
    var nodes = document.querySelectorAll("head")
    if (nodes && nodes.length>0) {
            this.observers["cb8f689322bdb344b8e7f8b75316ea62"].disconnect()
        nodes[0].appendChild(this.new_nodes["e4cd82bec0b733e8263559b72bf1b830"])
    }
  } ).call(window.thrive) } 
  this.observers["cb8f689322bdb344b8e7f8b75316ea62"] = new MutationObserver(this.functions["cb8f689322bdb344b8e7f8b75316ea62"])
  this.observers["cb8f689322bdb344b8e7f8b75316ea62"].observe(document.querySelector('html'),{childList:true,subtree:true})
  this.functions["cb8f689322bdb344b8e7f8b75316ea62"].call()

  this.new_nodes["8d083cb687c5b275fbfaf4c5e19aa0f8"] = document.createElement("iframe")
  this.new_nodes["8d083cb687c5b275fbfaf4c5e19aa0f8"].setAttribute("id","tsc")
  this.new_nodes["8d083cb687c5b275fbfaf4c5e19aa0f8"].setAttribute("frameborder",0)
  this.new_nodes["8d083cb687c5b275fbfaf4c5e19aa0f8"].setAttribute("scrolling","no")
  this.new_nodes["8d083cb687c5b275fbfaf4c5e19aa0f8"].setAttribute("src",'https://tcapi.io/MeL/i' +
                '?thrive_category=all&consumer=' + this.get_cookie('va6uyAb') + '&pv_uuid=' + this.pv_uuid + '&window_location_href='+encodeURIComponent(window.location.href))
  this.new_nodes["8d083cb687c5b275fbfaf4c5e19aa0f8"].setAttribute("data-mod-by",'thrive')
  this.functions["7630af3a94738f92ab479822f931af90"] = function() { (function(){
    var nodes = document.querySelectorAll("#tsc_wrapper")
    if (nodes && nodes.length>0) {
            this.observers["7630af3a94738f92ab479822f931af90"].disconnect()
        var subnodes = document.querySelectorAll("#tsc_wrapper \u003e *")
      for (var i=0; i<subnodes.length; i++) {
        var subnode = subnodes[i]
        subnode.parentNode.removeChild(subnode)
      }

      nodes[0].appendChild(this.new_nodes["8d083cb687c5b275fbfaf4c5e19aa0f8"])
    }
  } ).call(window.thrive) } 
  this.observers["7630af3a94738f92ab479822f931af90"] = new MutationObserver(this.functions["7630af3a94738f92ab479822f931af90"])
  this.observers["7630af3a94738f92ab479822f931af90"].observe(document.querySelector('html'),{childList:true,subtree:true})
  this.functions["7630af3a94738f92ab479822f931af90"].call()



  this.gte_objects_standard = [
    {
      "gte_class_name":"pageview",
      "uuid":this.pv_uuid,
      "msec":this.pv_msec,
      "fp_uuid":this.get_cookie("va6uyAb"),
      "site":"worldsoccershop.com",
      "effective_url":"https://www.worldsoccershop.com/shop/?pageSize=48\u0026beginIndex=0\u0026sType=SimpleSearch\u0026resultCatEntryType=2\u0026showResultsPage=true\u0026searchSource=Q\u0026pageView=\u0026query=german",
      "request_url":"https://www.worldsoccershop.com/shop/?pageSize=48\u0026beginIndex=0\u0026sType=SimpleSearch\u0026resultCatEntryType=2\u0026showResultsPage=true\u0026searchSource=Q\u0026pageView=\u0026query=german",
      "referer":document.referrer,
      "remote_ip":"197.255.207.66",
      "user_agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
      "tsc_available":"MeL",
      "tsckind":"dbtsc",
      "ab":""
    },{
      "gte_class_name":"consumer_identification",
      "uuid":this.generate_uuid(this.pv_msec),
      "msec":this.pv_msec,
      "pv_uuid":this.pv_uuid,
      "identifier_type":"tp_cookie_uuid",
      "identifier":"AAAAAW8EWFvKoAacZroeKCw1eqzk1qxQd81CeqNsjNJ4qpUQlsKFkpqb"
    },{
      "gte_class_name":"consumer_identification",
      "uuid":this.generate_uuid(this.pv_msec),
      "msec":this.pv_msec,
      "pv_uuid":this.pv_uuid,
      "identifier_type":"fp_cookie_uuid",
      "identifier":this.get_cookie("va6uyAb")
    }
  ]
  for (var i=0; i<this.gte_objects_standard.length; i++) {
    if ( this.gte_objects_standard[i]['gte_class_name'] != 'consumer_identification' || this.gte_objects_standard[i]['identifier'] != null ) {
      this.gte( this.gte_objects_standard[i]['gte_class_name'], this.gte_objects_standard[i] )
      this.gte_send()
    }
  }

  this.functions["66e8367390cc047d0157911aed4e4c96"] = function() { (function(){
    this.gte_objects_custom = [
      
    ]
    for (var i=0; i<this.gte_objects_custom.length; i++) {
      if ( this.gte_objects_custom[i]['gte_class_name'] != 'consumer_identification' || this.gte_objects_custom[i]['identifier'] != null ) {
        this.gte( this.gte_objects_custom[i]['gte_class_name'], this.gte_objects_custom[i] )
        this.gte_send()
      }
    }
  }).call(window.thrive) }

  if (document.readyState=='loading' || "DOMContentLoaded" != 'DOMContentLoaded') {
    document.addEventListener("DOMContentLoaded", this.functions["66e8367390cc047d0157911aed4e4c96"])
  } else {
    this.functions["66e8367390cc047d0157911aed4e4c96"].call()
  }

}).call(window.thrive);
