/* global React, $ */
'use strict'; 

var React = require('react');

require('../js/bootstrap-select');

var BootstrapSelect = React.createClass({
  displayName: 'BootstrapSelect',
  getInitialState: function () {
    return {
      open: false
    };
  },
  componentDidUpdate: function () {
    var domNode = React.findDOMNode(this);

    $(domNode).find('select').selectpicker('refresh');
    var select = $(domNode).find('div.bootstrap-select');
    select.toggleClass('open', this.state.open);
  },
  componentWillUnmount: function () {
    var domNode = React.findDOMNode(this);

    var select = $(domNode).find('select');
    var button = $(domNode).find('button');
    var dropdown = $(domNode).find('.dropdown-menu.open');
    var items = $(domNode).find('ul.dropdown-menu li a');

    $('html').off('click');
    button.off('click');
    items.off('click');
  },
  componentDidMount: function () {
    var self = this;
    var domNode = React.findDOMNode(this);

    var select = $(domNode).find('select');
    $(select).selectpicker();

    var button = $(domNode).find('button');
    var dropdown = $(domNode).find('.dropdown-menu.open');
    var items = $(domNode).find('ul.dropdown-menu li a');

    $('html').click(function () {
      self.setState({ open: false });
    });

    button.click(function (e) {
      e.stopPropagation();
      self.setState({ open: !self.state.open });
    });

    items.click(function () {
      if (self.props.multiple) return;
      self.setState({ open: !self.state.open });
    });
  },
  render: function () {
    return (
      <React.Bootstrap.Input {...this.props} type='select' />
    );
  }
});

module.exports = BootstrapSelect;
