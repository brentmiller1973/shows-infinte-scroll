'use strict';

var React = window.React = require('react');
var InfiniteScrollReactMixin = require('./infinite-scroll-react-mixin');

var tileMockData = [
    {"image-src": "//placehold.it/165x240&text=Drama"},
    {"image-src": "//placehold.it/165x240&text=History"},
    {"image-src": "//placehold.it/165x240&text=Arts"},
    {"image-src": "//placehold.it/165x240&text=Drama"},
    {"image-src": "//placehold.it/165x240&text=History"},
    {"image-src": "//placehold.it/165x240&text=Arts"},
    {"image-src": "//placehold.it/165x240&text=Drama"},
    {"image-src": "//placehold.it/165x240&text=History"},
    {"image-src": "//placehold.it/165x240&text=Arts"},
    {"image-src": "//placehold.it/165x240&text=History"}
];

var gridMockData = [
    {
        "url": "#",
        "image-src": "//placehold.it/165x240&text=Drama",
        "image-alt-text": "InsertShowTitle",
        "title": "Zebra Landing",
        "videos": "407",
        "genre": "Drama",
        "popular":true,
        "station":"weta",
        "latest": {
            "url": "#",
            "text": "InsertLastestEpisodeTitle"
        },
        "button": {
            "url": "#",
            "text": "See All"
        }
    },
    {
        "url": "#",
        "image-src": "//placehold.it/165x240&text=Drama",
        "image-alt-text": "InsertShowTitle",
        "title": "Baseball",
        "videos": "210",
        "genre": "Documentry",
        "popular":true,
        "station":"weta",
        "latest": {
            "url": "#",
            "text": "InsertLastestEpisodeTitle"
        },
        "button": {
            "url": "#",
            "text": "See All"
        }
    },
    {
        "url": "#",
        "image-src": "//placehold.it/165x240&text=Drama",
        "image-alt-text": "InsertShowTitle",
        "title": "Zebra Landing, Deep Space 10",
        "videos": "500",
        "genre": "Art",
        "popular":true,
        "station":"weta",
        "latest": {
            "url": "#",
            "text": "InsertLastestEpisodeTitle"
        },
        "button": {
            "url": "#",
            "text": "See All"
        }
    },
    {
        "url": "#",
        "image-src": "//placehold.it/165x240&text=Drama",
        "image-alt-text": "InsertShowTitle",
        "title": "Zebra Landing, The Last Stand!",
        "videos": "100",
        "genre": "Drama",
        "popular":true,
        "station":"weta",
        "latest": {
            "url": "#",
            "text": "InsertLastestEpisodeTitle"
        },
        "button": {
            "url": "#",
            "text": "See All"
        }
    },
    {
        "url": "#",
        "image-src": "//placehold.it/165x240&text=Drama",
        "image-alt-text": "InsertShowTitle",
        "title": "Zebra Landing, The Next Generation",
        "videos": "407",
        "genre": "Drama",
        "popular":true,
        "station":"weta",
        "latest": {
            "url": "#",
            "text": "InsertLastestEpisodeTitle"
        },
        "button": {
            "url": "#",
            "text": "See All"
        }
    }
];


var ShowTileResults = React.createClass({

    mixins: [InfiniteScrollReactMixin],

    getInitialState: function() {
        return {
            items: []
        };
    },

    fetchNextPage: function(nextPage) {
        console.log('Getting page: ' + nextPage);
        if(nextPage <= 50){
            this.setState({
                items: this.state.items.concat(tileMockData)
            });
        }

    },

    render: function() {
        var items = this.state.items.map(function(item) {
            return (
                <article className="col-centered hover-scale">
                    <a href="#">
                    <img src={item["image-src"]} />
                    </a>
                </article>
            );
        });

        return (
            <div className="row row-centered">{items}</div>
        );
    }

});


var ShowGridResults = React.createClass({

    mixins: [InfiniteScrollReactMixin],

    getInitialState: function() {
        return {
            items: []
        };
    },

    fetchNextPage: function(nextPage) {
        console.log('Getting page: ' + nextPage);
        if(nextPage <= 50){
            this.setState({
                items: this.state.items.concat(gridMockData)
            });
        }

    },


    render: function() {
        var rows = this.state.items.map(function(row) {
            return (
                <tr >
                    <td>
                        <a href={ row["url"] }>{ row["title"] }</a>
                    </td>
                    <td>{ row["videos"] }</td>
                    <td>{ row["genre"] }</td>
                    <td>
                        <a href={ row["latest"]["url"] }>{ row["latest"]["text"] }</a>
                    </td>
                    <td>
                        <a className="btn btn-default" href={ row["button"]["url"] }>{ row["button"]["text"] }</a>
                    </td>
                </tr>
            );
        });

        return (
            <div className="results-list">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Videos</th>
                            <th>Genre</th>
                            <th>Latest Episode</th>
                            <th>See All Videos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

});

document.renderDisplayType = function(type){
    if(type == "table"){
        React.render(<ShowGridResults offset={50} initialPage={0} />, document.getElementById("app"));
    }else{
        React.render(<ShowTileResults offset={50} initialPage={0} />, document.getElementById("app"));
    }
};




