import * as React from "react";
import { house_name_t } from "ts/houses";
import { treachery_card_t } from "ts/treachery_card";
import { useDispatch, useSelector } from "react-redux";
import {
  show_add_cards_modal,
  house_remove_card,
  house_toggle_expand_cards,
} from "ts/state/actions";
import TreacheryCard from "ts/components/TreacheryCard";
import { root_state } from "ts/state/reducers";

const maxCards = (house: house_name_t) => {
  if (house === "Harkonnen") {
    return 8;
  }

  return 4;
};

const ViewCards: React.FC<{
  house: house_name_t;
  cards: ReadonlyArray<treachery_card_t>;
}> = props => {
  const dispatch = useDispatch();
  const showCards = useSelector((state: root_state) => state.houses[props.house].show_cards);
  const allowAdd = props.cards.length < maxCards(props.house);

  return (
    <div className="box">
      <div className="columns is-mobile is-vcentered">
        <div
          className="column"
          onClick={() => dispatch(house_toggle_expand_cards(props.house))}
          style={{ cursor: "pointer" }}
        >
          <div className="heading is-marginless is-size-6">{`${props.cards.length} Card${
            props.cards.length === 1 ? "" : "s"
          }`}</div>
        </div>
        <div className="column is-narrow">
          <div className="buttons">
            <button
              className="button"
              onClick={() => {
                if (allowAdd) dispatch(show_add_cards_modal(props.house));
              }}
              disabled={!allowAdd}
            >
              <span className="icon">
                <i className="fas fa-plus" />
              </span>
              <span>Add card</span>
            </button>
            <button
              className="button"
              onClick={() => dispatch(house_toggle_expand_cards(props.house))}
            >
              <span className="icon">
                <i className={"fas fa-arrow-" + (showCards ? "down" : "up")} />
              </span>
            </button>
          </div>
        </div>
      </div>
      {showCards && (
        <div className="columns is-multiline">
          {props.cards.map((card, index) => (
            <div className="column is-half" key={"card-" + index}>
              <TreacheryCard
                card={card}
                onDelete={() => dispatch(house_remove_card(props.house, index))}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCards;
