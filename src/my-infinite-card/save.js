import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { cards } = attributes;

  return (
    <div {...useBlockProps.save({ className: 'card-list-wrapper' })}>
      <div className="card-list">
        {cards.map((card, index) => (
          <div key={index} className="card-item">
            {card.imageUrl && <img src={card.imageUrl} alt="" />}
            <RichText.Content tagName="p" value={card.description} />
          </div>
        ))}
      </div>
    </div>
  );
}
