'use strict';

/**
 * @ngdoc function
 * @name statsdsuApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the statsdsuApp
 */
angular.module('statsdsuApp')
  .controller('MenuCtrl', function ($scope){
    $scope.timelines = [
      {title:'Data Science Master Program', desc:'', date:'December 2017'},
      {title:'Stabilizing Kiosk & Digital Signage', desc:'', date:'Sep-20-2016'},
      {title:'Redesign User Interface STATSDSU', desc:'', date:'December 2016'},
      {title:'Production Ready STATSDSU', desc:'', date:'Sep-21-2016'}

    ];

    function revisit(){}
    var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d"),
      width = canvas.width,
      height = canvas.height;

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json("dImages/miserables.json", function(error, graph) {
      if (error) throw error;

      simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

      simulation.force("link")
        .links(graph.links);

      d3.select(canvas)
        .call(d3.drag()
          .container(canvas)
          .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

      function ticked() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        graph.links.forEach(drawLink);
        context.strokeStyle = "#aaa";
        context.stroke();

        context.beginPath();
        graph.nodes.forEach(drawNode);
        context.fill();
        context.strokeStyle = "#fff";
        context.stroke();
      }

      function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y);
      }
    });

    function dragstarted() {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
      if (!d3.event.active) simulation.alphaTarget(0);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }

    function drawLink(d) {
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
      context.moveTo(d.x + 3, d.y);
      context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    }

  });
