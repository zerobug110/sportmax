(function(window, $, undefined) {

	$.SlideNavigator = function(options, element) {
		this.$el = $(element);
		this._init(options);
	};

	$.SlideNavigator.defaults = {
		current: 0,
		itemsCount: 1,
		continuous_scrolling : false,
		onPrevClick: function(evt) {
		},
		onNextClick: function(evt) {
		}
	};

	$.SlideNavigator.prototype = {
		_init : function(options) {

			this.options = $.extend(true, {}, $.SlideNavigator.defaults, options);

			this.current = this.options.current;
			this.itemsCount = this.options.itemsCount;
			this.continuous_scrolling = this.options.continuous_scrolling;

			// add navigation buttons
			this._addControls();

			// hide/show the controls
			this._toggleControls();

			// initialize the events
			this._initEvents();
		},

		_addControls : function() {

			this.$navNext = $('<div class="slide-nav-next"></div>');
			this.$navPrev = $('<div class="slide-nav-prev"></div>');
			$('<div class="slide-nav"/>')
					.append(this.$navPrev)
					.append(this.$navNext)
					.prependTo(this.$el);
		},

		_toggleControls : function() {
			if (this.continuous_scrolling) {

				if (this.itemsCount > 1) {
					this.$navPrev.show();
					this.$navNext.show();
				} else {
					this.$navPrev.hide();
					this.$navNext.hide();
				}

			} else {

				if (this.current <= 0) {
					this.$navPrev.hide();
				} else if (this.itemsCount > 1) {
					this.$navPrev.show();
				}

				if (this.current >= this.itemsCount - 1) {
					this.$navNext.hide();
				} else if (this.itemsCount > 1) {
					this.$navNext.show();
				}
			}
		},

		_slideItemId : function(step) {
			var i = this.current + step;
			if (this.continuous_scrolling) {
				if (i < 0) {
					i = this.itemsCount - 1;
				} else if (i > this.itemsCount - 1) {
					i = 0;
				}
			} else {
				if (i < 0) {
					i = 0;
				} else if (i > this.itemsCount - 1) {
					i = this.itemsCount - 1;
				}
			}
			return i;
		},

		_initEvents : function() {

			var instance = this;

			// navigation buttons events
			this.$navNext.bind('click.SlideNavigator', function(evt) {
				var newItemId = instance._slideItemId.apply(instance, [1]);
				if (instance.current != newItemId) {
					instance.current = newItemId;
					instance._toggleControls.apply(instance);
					if ($.isFunction(instance.options.onNextClick)) {
						instance.options.onNextClick(evt);
					}
				}
			});

			this.$navPrev.bind('click.SlideNavigator', function(evt) {
				var newItemId = instance._slideItemId.apply(instance, [-1]);
				if (instance.current != newItemId) {
					instance.current = newItemId;
					instance._toggleControls.apply(instance);
					if ($.isFunction(instance.options.onPrevClick)) {
						instance.options.onPrevClick(evt);
					}
				}
			});
		},

		destroy : function(callback) {
			this._destroy(callback);
		},

		_destroy : function(callback) {
			this.$el.unbind('.SlideNavigator').removeData('SlideNavigator');
			$(window).unbind('.SlideNavigator');
			if (callback) callback.call();
		},

		selectItem : function(i) {
			if (i >= 0 && i < this.itemsCount) {
				this.current = i;
				this._toggleControls();
			}
		}
	};

	var logError = function(message) {
		if (this.console) {
			console.error(message);
		}
	};

	$.fn.SlideNavigator = function(options) {
		if (typeof options === 'string') {
			var args = Array.prototype.slice.call(arguments, 1);

			this.each(function() {
				var instance = $.data(this, 'SlideNavigator');
				if (!instance) {
					logError("cannot call methods on SlideNavigator prior to initialization; " +
							"attempted to call method '" + options + "'");
					return;
				}
				if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
					logError("no such method '" + options + "' for SlideNavigator instance");
					return;
				}
				instance[ options ].apply(instance, args);
			});
		} 
		else {
			this.each(function() {
				var instance = $.data(this, 'SlideNavigator');
				if (!instance) {
					$.data(this, 'SlideNavigator', new $.SlideNavigator(options, this));
				}
			});
		}
		return this;
	};

})(window, jQuery);