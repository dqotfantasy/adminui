import {animate, group, query, stagger, style, transition, trigger} from '@angular/animations';

export const yellow = trigger('yellow', [
  transition(':increment', group([
    style({backgroundColor: '#ffc107'}),
    animate('0.3s ease-out', style('*'))
  ])),
  transition(':decrement', group([
    style({backgroundColor: '#ffc107'}),
    animate('0.3s ease-out', style('*'))
  ]))
]);

export const blue = trigger('blue', [
  transition(':increment', group([
    style({backgroundColor: '#2196f3'}),
    animate('0.3s ease-out', style('*'))
  ])),
  transition(':decrement', group([
    style({backgroundColor: '#2196f3'}),
    animate('0.3s ease-out', style('*'))
  ]))
]);

export const list = trigger('list', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({opacity: 0, transform: 'translateY(-15px)'}),
        stagger(
          '50ms',
          animate(
            '550ms ease-out',
            style({opacity: 1, transform: 'translateY(0px)'})
          )
        )
      ],
      {optional: true}
    )
  ])
]);

export const fade = trigger('fade', [
  // The '* => *' will trigger the animation to change between any two states
  transition('* => *', [
    // The query function has three params.
    // First is the event, so this will apply on entering or when the element is added to the DOM.
    // Second is a list of styles or animations to apply.
    // Third we add a config object with optional set to true, this is to signal
    // angular that the animation may not apply as it may or may not be in the DOM.
    query(
      ':enter',
      [style({opacity: 0})],
      {optional: true}
    ),
    query(
      ':leave',
      // here we apply a style and use the animate function to apply the style over 0.3 seconds
      [style({opacity: 1}), animate('0.3s', style({opacity: 0}))],
      {optional: true}
    ),
    query(
      ':enter',
      [style({opacity: 0}), animate('0.3s', style({opacity: 1}))],
      {optional: true}
    )
  ])
]);
