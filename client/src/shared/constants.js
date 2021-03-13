export const tableDateColumnSettings = (
  label,
  editable,
  id = 'date',
  dateFormat = 'yyyy-MM-dd',
) => ({
  [id]: {
    id,
    type: 'date',
    label,
    editable,
    dateFormat,
    inputType: 'date',
    minWidth: 200,
  },
});

export const tableNumberColumnSettings = (
  label,
  editable,
  id = 'amount',
  headerColSpan = 1,
) => ({
  [id]: {
    id,
    label,
    editable,
    headerColSpan,
    inputType: 'number',
    minWidth: 100,
  },
});

export const tableTypeColumnSettings = (
  label,
  selectType,
  editable,
  items,
  id = 'type',
) => ({
  [id]: {
    id,
    label,
    selectType,
    editable,
    inputType: 'select',
    minWidth: 170,
    items,
  },
});

export const tableCommentColumnSettings = (label, editable) => ({
  comment: {
    id: 'comment',
    label,
    editable,
    inputType: 'textArea',
    minWidth: 170,
    headerColSpan: 2,
  },
});

export const tableEditColumnSettings = () => ({
  edit: {
    id: 'edit',
    inputType: 'edit',
    label: '',
    minWidth: 50,
  },
});

export const WALLETS_TYPES = {
  regular: {
    label: 'Regular',
  },
  goal: {
    label: 'Goal',
  },
};
