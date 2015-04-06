/**
 * Created by bmiller on 4/1/15.
 */

'use strict';

/**
 * Note: implementation class must implement function "fetchNextPage(pageNumber:number)"
 */
var InfiniteScrollReactMixin = {
    getDefaultProps: function() {
        return {
            initialPage: 1,
            offset: 250
        };
    },

    componentWillMount: function() {
        //Forcing the browser to the top to prevent triggering extra fetches
        window.scrollTo(0,0);
        this.nextPage = this.props.initialPage;
    },

    componentWillUnmount: function() {
        this.detachInfiniteScrollListener();
    },

    componentDidMount: function() {
        this.attachInfiniteScrollListener();
    },

    componentDidUpdate: function() {
        this.attachInfiniteScrollListener();
    },

    getElementTopPosition: function(element){
        if (element) {
            return element.offsetTop + this.getElementTopPosition(element.offsetParent);
        }else{
            return 0;
        }
    },

    infiniteScrollListener: function () {
        var element = this.getDOMNode();
        var scrollTop;
        if(window.pageYOffset){
            scrollTop = window.pageYOffset;
        }else{
            scrollTop = (document.documentElement || document.body.parentNode || document.body).scrollTop;
        }

        var currentScrollPosition = this.getElementTopPosition(element) + element.offsetHeight - scrollTop - window.innerHeight;

        //If currentScrollPosition is less then the offset, then we need to fetch the next page of results
        if (currentScrollPosition < this.props.offset) {
            this.detachInfiniteScrollListener();
            //fetchNextPage must be implemented by the class that uses this mixin
            this.fetchNextPage(this.nextPage++);
        }
    },

    attachInfiniteScrollListener: function () {
        window.addEventListener('scroll', this.infiniteScrollListener);
        window.addEventListener('resize', this.infiniteScrollListener);
        this.infiniteScrollListener();
    },

    detachInfiniteScrollListener: function () {
        window.removeEventListener('scroll', this.infiniteScrollListener);
        window.removeEventListener('resize', this.infiniteScrollListener);
    }
};

module.exports = InfiniteScrollReactMixin;

