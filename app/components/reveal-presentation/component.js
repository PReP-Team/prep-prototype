import Ember from 'ember';

export default Ember.Component.extend({
  isShowingContentModal: false,
  isShowingDownloadModal: false,
  slidesTitles:[],
  classNames: 'reveal-container',
  actions: {
    goToSlide: function(indexh,indexv) {
      this.toggleProperty('isShowingContentModal');
      Reveal.slide(indexh, indexv);
    },
    toggleModal: function(modal) {
      switch (modal) {
        case 'content':
          this.toggleProperty('isShowingContentModal');
          break;
        case 'download':
          this.toggleProperty('isShowingDownloadModal');
          break;
        default:
      }
    }
  },
  didInsertElement: function() {
    this.slidesTitlesEl = this.$('#sliderTitles');
    this.setSlidesTitles();
    this.initializeReveal();
  },
  setSlidesTitles: function() {
    this.$('.slides > section').each(function(index,section){
      var sections = $(section).find('section');
      var sectionsLenght = sections.length;
      this.slidesTitles[index]= [];
      if (sectionsLenght) {
        sections.each(function(index2,slide){
          this.slidesTitles[index].push(slide.dataset.title);
        }.bind(this));
      } else {
        this.slidesTitles[index].push(section.dataset.title);
      }
    }.bind(this));
  },
  initializeReveal: function() {
    Reveal.initialize({
      controls: false,
      progress: false,
      slideNumber: true,
      history: false,
      keyboard: true,
      overview: true,
      center: true,
      touch: true,
      loop: false,
      hideAddressBar: true, // Hides the address bar on mobile devices
      transition: 'slide', // none/fade/slide/convex/concave/zoom
      transitionSpeed: 'default', // default/fast/slow
    });
    // Slide number formatting can be configured using these variables:
    //  "h.v":  horizontal . vertical slide number (default)
    //  "h/v":  horizontal / vertical slide number
    //    "c":  flattened slide number
    //  "c/t":  flattened slide number / total slides
    Reveal.configure({ slideNumber: 'c/t' });
    Reveal.addEventListener( 'ready', function( event ) {
      this.updateTitle(event.indexh,event.indexv);
    }.bind(this));
    Reveal.addEventListener( 'slidechanged', function( event ) {
      this.updateTitle(event.indexh,event.indexv);
    }.bind(this));
  },
  updateTitle: function(indexh,indexv){
    this.slidesTitlesEl.html(this.slidesTitles[indexh][indexv]);
  }
});
